const i18n = require('i18n');
const path = require('path');
const apiM = require('./api');
const authM = require('./auth');
const userM = require('./user');
const docsM = require('./docs');
const langM = require('./lang');
const config = require('config');
const botM = require('./bot');
const listM = require('./list');
const express = require('express');
const auth = require('./auth/auth');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

i18n.configure({
	directory: path.join(__dirname, '..', 'locales'),
	cookie: 'lang',
	defaultLocale: 'en-gb',
	autoReload: true,
	updateFiles: false
});

const app = express();

app.locals.list_invite = config.get('discord').invite;

app.set('views', path.join(__dirname, 'dynamic')) // Allocate views to be used
	.set('view engine', 'pug')
	.use(cookieParser(config.get('webserver').secret)) // Set cookie secret
	.use(session({
		secret: config.get('webserver').secret,
		resave: true,
		saveUninitialized: true,
		proxy: true
	}))
	.use(i18n.init) // Use i18n
	.use(auth.initialize()) // Initiate the authentication mechanisms
	.use(auth.session())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(userM.userSetup) // Append details such as if they are an admin, and if they are in the guild
	.get('/', (req, res) => {
		res.render('index');
	})
	.use('/list', listM) // List Middleware
	.use('/api', apiM) // API
	.use('/auth', authM) // Authentication
	.use('/docs', docsM) // Documentation
	.use('/lang', langM) // Language settings
	.use('/bot', botM) // Listing bots
	.use(express.static(path.join(__dirname, 'static'))) // Pull static files from /src/static
	.use((req, res) => {
		// Give off a 404 if the chain ends here
		res.status(404).render('error.pug', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
