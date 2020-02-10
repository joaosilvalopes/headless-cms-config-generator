const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /api/app', () => {
	let authorization;

	beforeAll(() => {
		authorization = `Bearer ${globals.users.user1.token}`;
	});

	it('Should fail if connection string is invalid', async () => {
		await request(app)
			.post('/api/app')
			.set({ authorization })
			.send({
				name: 'name',
				slug: 'slug'
			})
			.expect(400);
	});

	it('Should fail if name is invalid', async () => {
		await request(app)
			.post('/api/app')
			.set({ authorization })
			.send({
				connectionString: 'connectionString',
				slug: 'slug'
			})
			.expect(400);
	});

	it('Should fail if slug is invalid', async () => {
		await request(app)
			.post('/api/app')
			.set({ authorization })
			.send({
				connectionString: 'connectionString',
				name: 'name'
			})
			.expect(400);
	});

	it('Should succeed', async () => {
		globals.users.user1.apps = [
			{
				slug: 'slug',
				name: 'name',
				connectionString: 'connectionString'
			}
		];

		await request(app)
			.post('/api/app')
			.set({ authorization })
			.send(globals.users.user1.apps[0])
			.expect(200);
	});

	it('Should fail if slug is taken', async () => {
		await request(app)
			.post('/api/app')
			.set({ authorization })
			.send({
				name: 'name',
				slug: 'slug',
				connectionString: 'connectionString'
			})
			.expect(400, {
				error: 'An app with this slug is already registered.'
			});
	});
});
