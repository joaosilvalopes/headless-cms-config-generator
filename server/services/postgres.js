const pg = require('pg');
require('dotenv').config({ path: `${__dirname}/../.env` });

const client = new pg.Client({
	connectionString: process.env.POSTGRES_STRING
});

client.connect();

module.exports = client;
