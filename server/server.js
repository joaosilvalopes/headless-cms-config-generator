/* eslint-disable no-console, global-require, import/no-dynamic-require */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const secure = require('./middlewares/secure');
const dotenv = require('dotenv');

dotenv.config();

const createRouter = app =>
	['post', 'get', 'delete', 'put'].reduce(
		(acc, method) => ({
			...acc,
			[method]: (url, ...args) => app[method](`/api${url}`, ...args)
		}),
		{}
	);

const app = express();
const router = createRouter(app);

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(cors());

const secureRoutes = [
	['get', '/app'],
	['post', '/app']
];

secureRoutes.forEach(([method, path]) => router[method](path, secure));

const routes = [
	'post-register',
	'post-login',
	'post-verify-email',
	'post-app',
	'get-app'
];

routes.forEach(route => require(`./routes/${route}`)(router));

const server = app.listen(app.get('port'), 'localhost', () => {
	console.log(
		`The server is now running at http://localhost:${app.get(
			'port'
		)} in ${app.get('env')} mode.`
	);
	console.log('Press CTRL-C to stop.\n');
});

module.exports = {
	app,
	closeServer: () => server.close()
};
