/* eslint-disable no-console, global-require, import/no-dynamic-require */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const secure = require('./middlewares/secure');
require('dotenv').config({ path: `${__dirname}/.env` });

const app = express();

app.set('port', process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(cors());

const secureRoutes = [];

secureRoutes.forEach(([method, path]) => app[method](path, secure));

const routes = [];

routes.forEach(route => require(`./routes/${route}`)(app));

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
