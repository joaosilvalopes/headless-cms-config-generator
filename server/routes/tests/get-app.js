const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('GET /api/app', () => {
	let authorization;

	beforeAll(() => {
		authorization = `Bearer ${globals.users.user1.token}`;
	});

	it('Should succeed', async () => {
		await request(app)
			.get('/api/app')
			.set({ authorization })
			.expect(200, globals.users.user1.apps);
	});
});
