const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const client = new pg.Client({
	connectionString: process.env.POSTGRES_STRING
});

client.connect();

module.exports = client;
