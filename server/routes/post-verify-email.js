const postgres = require('../services/postgres');
const logger = require('../utils/logger');
const { verifyToken } = require('../utils/authToken');

module.exports = app =>
	app.post('/verify-email', async (req, res) => {
		const { token } = req.body;

		try {
			const user = verifyToken(token);

			await postgres.query(
				`
            update "user"
            set verified = true
            where username = $1
        `,
				[user.username]
			);

			res.send(user);
		} catch (error) {
			logger.log(error);
			res.status(400).send({});
		}
	});
