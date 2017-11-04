const r = require('./db');
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
const bot = require('./listbot');
const express = require('express');
const auth = require('./auth/auth');
const bodyParser = require('body-parser');
const session = require('express-session');
const RDBStore = require('session-rethinkdb')(session);
const cookieParser = require('cookie-parser');

i18n.configure({
	directory: path.join(__dirname, '..', 'locales'),
	cookie: 'lang',
	defaultLocale: 'en-gb',
	autoReload: true,
	updateFiles: false
});

const store = new RDBStore(r);
const app = express();

const isOnline = (req, res, next) => {
	if (bot.ready) {
		next();
	} else {
		res.status(500).render('error', {
			status: 500,
			message: res.__('error_bot_offline')
		});
	}
};

app.locals.list_invite = config.get('discord').invite;

app.set('views', path.join(__dirname, 'dynamic')) // Allocate views to be used
	.set('view engine', 'pug')
	.use(cookieParser(config.get('webserver').secret)) // Set cookie secret
	.use(session({
		secret: config.get('webserver').secret,
		resave: true,
		saveUninitialized: true,
		proxy: true,
		store
	}))
	.use(i18n.init) // Use i18n
	.use(auth.initialize()) // Initiate the authentication mechanisms
	.use(auth.session())
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(userM.userSetup) // Append details such as if they are an admin, and if they are in the guild
	.get('/', isOnline, (req, res) => {
		res.render('index');
	})
	.use('/list', isOnline, listM) // List Middleware
	.use('/auth', isOnline, authM) // Authentication
	.use('/docs', isOnline, docsM) // Documentation
	.use('/lang', isOnline, langM) // Language settings
	.use('/bot', isOnline, botM) // Listing bots
	.use('/api', isOnline, apiM) // API
	.use(express.static(path.join(__dirname, 'static'))) // Pull static files from /src/static
	.use((req, res) => {
		// Give off a 404 if the chain ends here
		res.status(404).render('error', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);
