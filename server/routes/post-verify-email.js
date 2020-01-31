const postgres = require('../services/postgres');
const logger = require('../utils/logger');
const { verifyToken, withToken } = require('../utils/authToken');

module.exports = app =>
	app.post('/verify-email', async (req, res) => {
		const { token } = req.body;

		try {
			const { username } = verifyToken(token);

			const { rows } = await postgres.query(
				`
            update "user"
            set verified = true
			where username = $1
			returning 
				username,
				email,
				password,
				verified
        `,
				[username]
			);

			res.send(withToken(rows[0]));
		} catch (error) {
			logger.log(error);
			res.status(400).send({});
		}
	});
