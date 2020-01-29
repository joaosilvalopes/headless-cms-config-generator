/* eslint-disable global-require */
const dbUtils = require('../../db-scripts');
const { closeServer } = require('../../server');
const pg = require('../../services/postgres');

describe('Route main test collection', () => {
	beforeAll(async () => {
		await dbUtils.dropTables();
		await dbUtils.createTables();
	});

	afterAll(closeServer);

	require('./post-register');
	require('./post-verify-email');
	require('./post-login');
});
