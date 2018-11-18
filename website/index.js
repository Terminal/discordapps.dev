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

const authRouter = require('./routers/auth');
const botsRouter = require('./routers/bots');
const langRouter = require('./routers/locales');
const adminRouter = require('./routers/admin');
const v1Router = require('./routers/v1');
const { localise } = require('./static/list');

require('./static/banner');

const store = new RDBStore(r);
const app = express();

app.locals.links = config.links;
app.locals.defaultLanguage = config.defaultLanguage;
app.locals.siteLocales = i18n.getLocales();

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
      getCurrentLocale: (...args) => {
        const options = args.pop();
        return i18n.getLocale(options);
      },
      stringify: (...args) => JSON.stringify(...args),
      concat: (...args) => args.slice(0, -1).join(''),
      isArray: value => Array.isArray(value),
      or: (var1, var2) => var1 || var2,
      isEqual: (var1, var2) => var1 === var2,
      add: (var1, var2) => var1 + var2
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
  }))
  .use(express.static(path.join(__dirname, 'www-root')))
  .use('/node_modules/', express.static(path.join(__dirname, '..', 'node_modules')))
  .use((req, res, next) => {
    if (req.user) {
      req.user.admin = req.user && config.owners.includes(req.user.id);
      res.locals.user = req.user;
    } else {
      res.locals.user = {};
    }
    next();
  })
  .get('/', (req, res, next) => {
    r.table('bots')
      .orderBy(r.desc('random'))
      .filter({
        verified: true,
        nsfw: false
      })
      .limit(12)
      .then((list) => {
        const localised = list.map(item => localise(item, req));
        const slider = localised.splice(0, 6);
        res.render('main', {
          slider,
          cards: localised
        });
      })
      .catch((err) => {
        next(err);
      });
  })
  .get('/oops', (req, res, next) => {
    next(new Error('This error was thrown on purpose'));
  })
  .use('/auth', authRouter)
  .use('/bots', botsRouter)
  .use('/locale', langRouter)
  .use('/admin', adminRouter)
  .use('/api', v1Router)
  .use('/api/v1', v1Router)
  .use((req, res) => {
    res.status(404).render('error', {
      message: res.__('pages.error.notfound')
    });
  })
  .use((err, req, res, next) => {
    if (err) {
      res.status(500).render('error', {
        message: res.__('pages.error.server'),
        err
      });
    } else {
      next();
    }
  })
  .listen(config.webserver.port);

periodical();
setInterval(() => {
  periodical();
}, 1000 * 60 * 60 * 12);
