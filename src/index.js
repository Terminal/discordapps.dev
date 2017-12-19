const r = require('./db');
const i18n = require('i18n');
const path = require('path');
const apiM = require('./api');
const botM = require('./bot');
const authM = require('./auth');
const userM = require('./user');
const docsM = require('./docs');
const langM = require('./lang');
const csrfM = require('./csrf');
const listM = require('./list');
const config = require('config');
const bot = require('./discord');
const themeM = require('./theme');
const express = require('express');
const auth = require('./auth/auth');
const bodyParser = require('body-parser');
const session = require('express-session');
const themes = require('express-theme-pug');
const cookieParser = require('cookie-parser');
const RDBStore = require('session-rethinkdb')(session);
const themelist = require('./data/themes.json').selectable;

// Configure internationalisation
i18n.configure({
	directory: path.join(__dirname, '..', 'locales'),
	cookie: 'lang',
	defaultLocale: 'en-gb',
	autoReload: true,
	updateFiles: false
});

const store = new RDBStore(r);
const app = express();

/**
 * Check if the bot is ready at this moment
 * @param {*} req Express Request Information
 * @param {*} res Express Result Methods
 * @param {*} next Callback to run next middleware
 */
const isOnline = (req, res, next) => {
	if (bot.ready) {
		next();
	} else {
		res.status(500).json({
			error: 'The webserver has not fully initialised yet. Please try again later'
		});
	}
};

app.locals.list_invite = config.get('discord').invite;
app.locals.location = config.get('webserver').location;
app.locals.guild_id = config.get('discord').guild;
app.locals.production = config.get('production');

app.set('views', path.join(__dirname, 'dynamic')) // Allocate views to be used
	.set('view engine', 'pug')
	.use(cookieParser(config.get('webserver').secret)) // Set cookie secret
	.use(session({
		secret: config.get('webserver').secret,
		resave: true,
		saveUninitialized: true,
		proxy: true,
		store
	})) // Set session
	.use(i18n.init) // Use i18n
	.use(themes) // Use themes
	.use(auth.initialize()) // Initiate the authentication mechanisms
	.use(auth.session())
	.use(isOnline) // Check if the webserver is fully online yet
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(userM.userSetup) // Append details such as if they are an admin, and if they are in the guild
	.use((req, res, next) => {
		if (themelist.includes(req.cookies.theme)) res.theme(req.cookies.theme);
		next();
	})
	.get('/', csrfM.make, (req, res, next) => {
		res.locals.approve = true;
		next();
	}, listM.list) // List the homepage
	.use('/list', listM.router) // List Middleware
	.use('/auth', authM) // Authentication
	.use('/docs', docsM) // Documentation
	.use('/lang', langM) // Language settings
	.use('/theme', themeM) // Theme settings
	.use('/bot', botM) // Listing bots
	.use('/api', apiM) // API
	.use(express.static(path.join(__dirname, 'static'))) // Pull static files from /src/static
	.use((req, res) => {
		// Give off a 404 if the chain ends here
		res.status(404).render('error', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port); // Listen to the port (default: 8080)

process.on('unhandledRejection', (reason) => {
	console.dir(reason);
});
