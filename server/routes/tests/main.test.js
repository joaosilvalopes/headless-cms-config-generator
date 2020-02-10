/* eslint-disable global-require */
const dbUtils = require('../../db-scripts');
const { closeServer } = require('../../server');

describe('Route main test collection', () => {
	beforeAll(async () => {
		await dbUtils.dropTables();
		await dbUtils.createTables();
	});

	afterAll(closeServer);

	require('./post-register');
	require('./post-verify-email');
	require('./post-login');
	require('./post-app');
	require('./get-app');
});
