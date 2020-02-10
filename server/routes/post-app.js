const postgres = require('../services/postgres');
const logger = require('../utils/logger');

const messagePerConstraint = {
	app_slug_key: 'An app with this slug is already registered.'
};

module.exports = app =>
	app.post('/app', async (req, res) => {
		const { connectionString, name, slug } = req.body;

		if (!slug || !name || !connectionString) {
			return res.status(400).send({});
		}

		try {
			await postgres.query(
				`
            insert into App(slug, name, connection_string, user_id)
            values($1, $2, $3, $4)
        `,
				[slug, name, connectionString, req.user.id]
			);

			return res.status(200).send({});
		} catch (error) {
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
