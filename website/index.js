const i18n = require('i18n');
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
const authRouter = require('./routers/auth');
const config = require('./config');

const testPayload = require('./payload.json');

require('./static/banner');

// Configure internationalisation
i18n.configure({
  directory: path.join(__dirname, '..', 'locales'),
  cookie: 'lang',
  defaultLocale: 'en',
  autoReload: true,
  updateFiles: false,
  objectNotation: true,
});

const store = new RDBStore(r);
const app = express();

app.set('views', path.join(path.dirname(__filename), 'views'))
  .set('view engine', 'handlebars')
  .engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(path.dirname(__filename), 'views', 'layouts'),
    partialsDir: path.join(path.dirname(__filename), 'views', 'partials'),
    helpers: {
      i18n: (...args) => {
        const options = args.pop();
        return i18n.__.apply(options, args);
      },
    },
  }))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(i18n.init)
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
  .use(sass({ // Turns SASS to CSS in real time
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'www-root', 'css'),
    prefix: '/css',
  }))
  .use(express.static(path.join(__dirname, 'www-root')))
  .use((req, res, next) => {
    res.locals.user = req.user;
    next();
  })
  .get('/', (req, res) => {
    res.render('list', {
      list: testPayload
    });
  })
  .get('/oops', (req, res, next) => {
    next(new Error('This error was thrown on purpose'));
  })
  .use('/auth', authRouter)
  .use((req, res) => {
    res.status(404).render('error', {
      message: res.__('pages.error.notfound')
    });
  })
  .use((err, req, res, next) => {
    res.status(500).render('error', {
      message: res.__('pages.error.server'),
      err
    });
  })
  .listen(config.webserver.port);

process.on('unhandledRejection', (reason) => {
  throw reason;
});
