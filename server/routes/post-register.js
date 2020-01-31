const bcrypt = require('bcrypt');
const postgres = require('../services/postgres');
const mail = require('../services/mail');
const logger = require('../utils/logger');
const {
	isValidUsername,
	isValidEmail,
	isValidPassword
} = require('../utils/validation');
const { signToken } = require('../utils/authToken');

const messagePerConstraint = {
	user_email_key: 'A user with this email is already registered.',
	user_username_key: 'A user with this username is already registered.'
};

module.exports = app =>
	app.post('/register', async (req, res) => {
		const { username, password, email } = req.body;

		if (
			!isValidUsername(username) ||
			!isValidPassword(password) ||
			!isValidEmail(email)
		) {
			return res.status(400).send({});
		}

		try {
			const hashedPassword = await bcrypt.hash(
				password,
				+process.env.BCRYPT_SALT_ROUNDS
			);

			await postgres.query('begin');

			await postgres.query(
				`
            insert into "user"(username, email, password)
            values($1, $2, $3)
        `,
				[username, email, hashedPassword]
			);

			const token = signToken({ email, username });

			await mail.sendVerificationEmail(email, token);

			await postgres.query('commit');

			return res.status(200).send({});
		} catch (error) {
			await postgres.query('rollback');

			if (messagePerConstraint[error.constraint]) {
				return res
					.status(400)
					.json({ error: messagePerConstraint[error.constraint] });
			}
			console.log(error);
			logger.log(error);
			return res.status(400).send({});
		}
	});
