/**
  This file is licenced under CC0 1.0
  https://creativecommons.org/publicdomain/zero/1.0/
  https://github.com/Terminal/discordapps.dev/tree/archive-pugjs
*/

require('./setinterval');
const i18n = require('i18n');
const path = require('path');
const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const themes = require('express-theme-pug');
const cookieParser = require('cookie-parser');
const r = require('./db');
const apiM = require('./routers/api');
const botM = require('./routers/bot');
const authM = require('./auth');
const userM = require('./routers/user');
const docsM = require('./routers/docs');
const langM = require('./routers/lang');
const csrfM = require('./routers/csrf');
const listM = require('./routers/list');
const discord = require('./discord');
const themeM = require('./routers/theme');
const auth = require('./auth/auth');
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
  .set('theme', 'bootstrap')
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
