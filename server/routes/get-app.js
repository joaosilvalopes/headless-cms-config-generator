const postgres = require('../services/postgres');
const logger = require('../utils/logger');

module.exports = app =>
	app.get('/app', async (req, res) => {
		try {
			const result = await postgres.query(
				`
                select slug, name, connection_string as "connectionString" from App
                where user_id = $1
            `,
				[req.user.id]
			);

			return res.status(200).send(result.rows);
		} catch (error) {
			console.log(error);
			logger.log(error);
			return res.status(400).send({});
		}
	});
