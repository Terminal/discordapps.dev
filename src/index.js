/**
	This is free and unencumbered software released into the public domain.

	Anyone is free to copy, modify, publish, use, compile, sell, or
	distribute this software, either in source code form or as a compiled
	binary, for any purpose, commercial or non-commercial, and by any
	means.

	In jurisdictions that recognize copyright laws, the author or authors
	of this software dedicate any and all copyright interest in the
	software to the public domain. We make this dedication for the benefit
	of the public at large and to the detriment of our heirs and
	successors. We intend this dedication to be an overt act of
	relinquishment in perpetuity of all present and future rights to this
	software under copyright law.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
	OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
	ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
	OTHER DEALINGS IN THE SOFTWARE.

	For more information, please refer to <http://unlicense.org>
*/

require('./setinterval');
const r = require('./db');
const i18n = require('i18n');
const path = require('path');
const apiM = require('./routers/api');
const botM = require('./routers/bot');
const authM = require('./auth');
const userM = require('./routers/user');
const docsM = require('./routers/docs');
const langM = require('./routers/lang');
const csrfM = require('./routers/csrf');
const listM = require('./routers/list');
const discord = require('./discord');
const config = require('config');
const themeM = require('./routers/theme');
const express = require('express');
const auth = require('./auth/auth');
const bodyParser = require('body-parser');
const session = require('express-session');
const themes = require('express-theme-pug');
const cookieParser = require('cookie-parser');
const RDBStore = require('session-rethinkdb')(session);

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

let online = false;

// Have a status to check if the Discord bot is online or not
discord.on('ready', () => {
	online = true;
});

discord.on('disconnect', () => {
	online = false;
});

/**
 * Check if the bot is ready at this moment
 * @param {*} req Express Request Information
 * @param {*} res Express Result Methods
 * @param {*} next Callback to run next middleware
 */
const isOnline = (req, res, next) => {
	if (online) {
		next();
	} else {
		res.status(500).render('error', { status: 500, message: res.__('error_bot_offline') });
	}
};

app.locals.list_invite = config.get('discord').invite;
app.locals.location = config.get('webserver').location;
app.locals.guild_id = config.get('discord').guild;
app.locals.production = config.get('production');

app.set('views', path.join(__dirname, 'dynamic'))
	.set('view engine', 'pug')
	.use(bodyParser.json())
	.use(bodyParser.urlencoded({
		extended: true
	}))
	.use(i18n.init)
	.use('/api', apiM) // API
	.use(cookieParser(config.get('webserver').secret))
	.use(session({
		secret: config.get('webserver').secret,
		resave: true,
		saveUninitialized: true,
		proxy: true,
		store
	}))
	.use(themes)
	.use(auth.initialize())
	.use(auth.session())
	.use(userM.userSetup)
	.use(express.static(path.join(__dirname, 'static')))
	.use(isOnline)
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
	.use((req, res) => {
		res.status(404).render('error', { status: 404, message: 'Not found' });
	})
	.listen(config.get('webserver').port);

process.on('unhandledRejection', (reason) => {
	console.dir(reason);
});
