const request = require('supertest');
const { app } = require('../../server');

describe('POST /api/app', () => {
	it('Should fail if connection string is invalid', async () => {
		await request(app)
			.post('/api/app')
			.send({
				name: 'name',
				slug: 'slug'
			})
			.expect(400);
	});

	it('Should fail if name is invalid', async () => {
		await request(app)
			.post('/api/app')
			.send({
				connectionString: 'connectionString',
				slug: 'slug'
			})
			.expect(400);
	});

	it('Should fail if slug is invalid', async () => {
		await request(app)
			.post('/api/app')
			.send({
				connectionString: 'connectionString',
				name: 'name'
			})
			.expect(400);
	});

	it('Should succeed', async () => {
		await request(app)
			.post('/api/app')
			.send({
				name: 'name',
				slug: 'slug',
				connectionString: 'connectionString'
			})
			.expect(200);
	});

	it('Should fail if slug is taken', async () => {
		await request(app)
			.post('/api/app')
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
