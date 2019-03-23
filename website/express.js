const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const RDBStore = require('session-rethinkdb')(session);

const r = require('./rethinkdb');
const i18n = require('../global/i18n');
const passport = require('./static/passport');
const config = require('./config');
const periodical = require('./static/periodical');

const websiteRouter = require('./routers/website');
const sitemapRouter = require('./routers/sitemap');
const languageMiddleware = require('./middleware/language');
// const getBetterLanguageMiddleware = require('./middleware/getBetterLanguage');

const selectableStates = require('./data/states.json');
const allowedCors = require('./data/cors.json');

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
  .use(i18n.init)
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
  .use('/sitemap.xml', sitemapRouter)
  .use('/en-GB/', languageMiddleware('en-GB'), websiteRouter) // Can't use `:lang`, will explode
  .use('/en-GB', languageMiddleware('en-GB'), websiteRouter)
  .use('/de/', languageMiddleware('de'), websiteRouter) // Can't use `:lang`, will explode
  .use('/de', languageMiddleware('de'), websiteRouter)
  .use('/da/', languageMiddleware('da'), websiteRouter)
  .use('/da', languageMiddleware('da'), websiteRouter)
  .use('/fr/', languageMiddleware('fr'), websiteRouter)
  .use('/fr', languageMiddleware('fr'), websiteRouter)
  .use('/pl/', languageMiddleware('pl'), websiteRouter)
  .use('/pl', languageMiddleware('pl'), websiteRouter)
  .use('/zh-cn/', languageMiddleware('zh-cn'), websiteRouter)
  .use('/zh-cn', languageMiddleware('zh-cn'), websiteRouter)
  .use('/', websiteRouter)
  .use((err, req, res, next) => {
    if (err) {
      res.status(500).render('error', {
        message: res.__('pages.error.server'),
        err,
        githubTitle: `Error with ${req.method} with link ${req.originalURL || req.url}`,
        githubBody: encodeURIComponent(`${res.__('pages.error.report')}\n\n\n\n---\nURL: ${req.originalURL || req.url}\nMETHOD: ${req.method}\n\n\`\`\`\n${err.stack}\n\`\`\``)
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
