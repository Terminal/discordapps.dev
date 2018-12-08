const i18n = require('./static/i18n');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const path = require('path');
const handlebars = require('express-handlebars');
const sass = require('node-sass-middleware');
const RDBStore = require('session-rethinkdb')(session);
const r = require('./rethinkdb');
const passport = require('./static/passport');
const config = require('./config');
const periodical = require('./static/periodical');

const websiteRouter = require('./routers/website');
const v1Router = require('./routers/v1');
const sitemapRouter = require('./routers/sitemap');
const languageMiddleware = require('./middleware/language');
const getBetterLanguageMiddleware = require('./middleware/getBetterLanguage');

require('./static/banner');

const store = new RDBStore(r);
const app = express();

app.locals.links = config.links;
app.locals.defaultLanguage = config.default.language;
app.locals.defaultImage = config.default.image;

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
      date: (date, getLocale) => (new Date(date)).toLocaleDateString(getLocale(), config.dateformat),
      stringify: (...args) => JSON.stringify(...args),
      concat: (...args) => args.slice(0, -1).join(''),
      isArray: value => Array.isArray(value),
      encodeURIComponent: value => encodeURIComponent(value),
      or: (var1, var2) => var1 || var2,
      and: (var1, var2) => var1 && var2,
      isEqual: (var1, var2) => var1 === var2,
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
  .use(sass({ // Turns SASS to CSS in real time
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'www-root', 'css'),
    prefix: '/css',
    debug: false,
  }))
  .use(express.static(path.join(__dirname, 'www-root')))
  .use('/node_modules/', express.static(path.join(__dirname, 'node_modules')))
  .use('/css/images/', express.static(path.join(__dirname, 'www-root', 'ModestaCSS', 'css', 'images')))
  .use('/sitemap.xml', sitemapRouter)
  .use('/de/', languageMiddleware('de'), websiteRouter) // Can't use `:lang`, will explode
  .use('/de', languageMiddleware('de'), websiteRouter)
  .use('/fr/', languageMiddleware('fr'), websiteRouter)
  .use('/fr', languageMiddleware('fr'), websiteRouter)
  .use('/', getBetterLanguageMiddleware, websiteRouter)
  .use('/api', v1Router)
  .use('/api/v1', v1Router)
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
    res.status(404).render('error', {
      message: res.__('pages.error.notfound')
    });
  })
  .listen(config.webserver.port);

periodical();
setInterval(() => {
  periodical();
}, 1000 * 60 * 60 * 12);
