const bcrypt = require('bcrypt');
const postgres = require('../services/postgres');
const emailService = require('../services/emailService');
const logger = require('../utils/logger');
const {
	isValidUsername,
	isValidEmail,
	isValidPassword
} = require('../utils/validation');
const { withToken } = require('../utils/authToken');

const messagePerConstraint = {
	users_email_key: 'A user with this email is already registered.',
	users_username_key: 'A user with this username is already registered.'
};

module.exports = app =>
	app.post('/register', async (req, res) => {
		const { username, password, email } = req.body;

		if (
			!isValidUsername(username) ||
			!isValidPassword(password) ||
			!isValidEmail(email)
		) {
			return res.status(400).send();
		}

		try {
			const hashedPassword = await bcrypt.hash(
				password,
				+process.env.BCRYPT_SALT_ROUNDS
			);

			await postgres.query('begin');

			await postgres.query(
				`
            insert into Users(username, email, password)
            values($1, $2, $3)
        `,
				[username, email, hashedPassword]
			);

			const user = withToken({
				email,
				username,
				verified: false
			});

			await emailService.sendVerificationEmail(email, user.token);

			await postgres.query('commit');

			return res.json(user);
		} catch (error) {
			await postgres.query('rollback');

			if (messagePerConstraint[error.constraint]) {
				return res
					.status(400)
					.json({ error: messagePerConstraint[error.constraint] });
			}
			console.log(error);
			logger.log(error);
			return res.status(400).send();
		}
	});
