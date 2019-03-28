const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const RDBStore = require('session-rethinkdb')(session);

const r = require('./rethinkdb');
const passport = require('./static/passport');
const config = require('./config');
const periodical = require('./static/periodical');

const websiteRouter = require('./routers/website');
const sitemapRouter = require('./routers/sitemap');

const selectableStates = require('./data/states.json');
const allowedCors = require('./data/cors.json');
const languages = require('./data/languages.json');

require('./static/banner');

const store = new RDBStore(r);
const app = express();

app.locals.links = config.links;
app.locals.defaultLanguage = config.default.language;
app.locals.defaultImage = config.default.image;
app.locals.selectableStates = selectableStates;

app
  .set('json spaces', 4)
  .use(cors({
    origin(origin, callback) {
      if (allowedCors.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true
  }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(cookieParser(config.webserver.secret))
  .use(session({
    secret: config.webserver.secret,
    resave: true,
    saveUninitialized: true,
    proxy: true,
    store
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(path.join(__dirname, 'www-root')))
  .use('/', (req, res, next) => {
    res.locals.languagePrefix = 'en-GB';
    next();
  }, websiteRouter)
  .use('/:locale/', (req, res, next) => {
    res.locals.languagePrefix = req.params.locale;
    if (languages.map(lang => lang.toLowerCase()).includes(req.params.locale.toLowerCase())) {
      next();
    } else {
      res.redirect(`${config.webserver.react || 'https://discordapps.dev'}${req.originalUrl}`);
    }
  }, websiteRouter)
  .use('/ls13.xml', sitemapRouter)
  .use((err, req, res, next) => {
    if (err) {
      res.json({
        ok: false,
        message: 'pages.error.server',
        data: err.stack
      });
    } else {
      next();
    }
  })
  .use((req, res) => {
    res.redirect(`${config.webserver.react || 'https://discordapps.dev'}${req.originalUrl}`);
  });

periodical();
setInterval(() => {
  periodical();
}, 1000 * 60 * 60 * 12);

module.exports = app;
