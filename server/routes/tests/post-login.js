const request = require('supertest');
const { app } = require('../../server');
const globals = require('./globals');

describe('POST /api/login', () => {
	it('Should fail if there is no registered user', async () => {
		await request(app)
			.post('/api/login')
			.send({
				login: 'unknownUser',
				password: globals.users.user1.password
			})
			.expect(400);
	});

	it('Should fail if password is wrong', async () => {
		await request(app)
			.post('/api/login')
			.send({
				login: globals.users.user1.username,
				password: 'wrongPassword12345'
			})
			.expect(400);
	});

	it('Should not work with unverified users', async () => {
		await request(app)
			.post('/api/login')
			.send({
				login: globals.users.user2.email,
				password: globals.users.user2.password
			})
			.expect(400);
	});

	it('Should work', async () => {
		await request(app)
			.post('/api/login')
			.send({
				login: globals.users.user1.username,
				password: globals.users.user1.password
			})
			.expect(200);

		const res1 = await request(app)
			.post('/api/login')
			.send({
				login: globals.users.user1.email,
				password: globals.users.user1.password
			})
			.expect(200);

		globals.users.user1 = { ...globals.users.user1, ...res1.body };
	});
});
