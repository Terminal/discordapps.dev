const cors = require('cors');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const sass = require('node-sass-middleware');
const cookieParser = require('cookie-parser');
const RDBStore = require('session-rethinkdb')(session);
const handlebars = require('express-handlebars');

const r = require('./rethinkdb');
const i18n = require('../global/i18n');
const passport = require('./static/passport');
const config = require('./config');
const periodical = require('./static/periodical');

const websiteRouter = require('./routers/website');
const sitemapRouter = require('./routers/sitemap');
const languageMiddleware = require('./middleware/language');
// const getBetterLanguageMiddleware = require('./middleware/getBetterLanguage');

const dateformat = require('./data/dateformat.json');
const selectableStates = require('./data/states.json');

const alternativeSites = require('./data/sites.json');
const allowedCors = require('./data/cors.json');

require('./static/banner');

const store = new RDBStore(r);
const app = express();

app.locals.links = config.links;
app.locals.defaultLanguage = config.default.language;
app.locals.defaultImage = config.default.image;
app.locals.selectableStates = selectableStates;

app.set('views', path.join(path.dirname(__filename), 'views'))
  .set('view engine', 'handlebars')
  .set('json spaces', 4)
  .engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(path.dirname(__filename), 'views', 'layouts'),
    partialsDir: path.join(path.dirname(__filename), 'views', 'partials'),
    helpers: {
      i18n: (translator, name, ...args) => {
        const replacement = {};
        for (let i = 0; i < args.length; i += 2) {
          replacement[args[i]] = args[i + 1];
        }
        if (typeof translator === 'function') {
          return translator(name, replacement);
        }
        return args[0] || 'Translation Error!';
      },
      i18ns: (translator, ...args) => {
        if (typeof translator === 'function') {
          return translator(...args);
        }
        return args[0] || 'Translation Error!';
      },
      date: (date, getLocale) => (new Date(date)).toLocaleDateString(getLocale(), dateformat),
      stringify: (...args) => JSON.stringify(...args),
      concat: (...args) => args.slice(0, -1).join(''),
      isArray: value => Array.isArray(value),
      encodeURIComponent: value => encodeURIComponent(value),
      or: (var1, var2) => var1 || var2,
      and: (var1, var2) => var1 && var2,
      isEqual: (var1, var2) => var1 === var2,
      not: var1 => !var1,
      add: (var1, var2) => var1 + var2,
      languages: () => i18n.getLocales(),
      webserverLocation: () => config.webserver.location,
      do: (n, block) => {
        let accumulator = '';
        for (let i = 0; i < n; i += 1) {
          accumulator += block.fn(i);
        }
        return accumulator;
      }
    },
  }))
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
