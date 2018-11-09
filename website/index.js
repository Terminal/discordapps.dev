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

require('./static/banner');

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

app.set('views', path.join(path.dirname(__filename), 'views'))
  .set('view engine', 'handlebars')
  .engine('handlebars', handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(path.dirname(__filename), 'views', 'layouts'),
    partialsDir: path.join(path.dirname(__filename), 'views', 'partials'),
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
    prefix: '/assets/css',
  }))
  .use(express.static(path.join(__dirname, 'www-root')))
  .get('/', (req, res) => {
    res.render('hi');
  })
  .use('/auth', authRouter)
  .use((req, res) => {
    res.send('404');
  })
  .use((err, req, res, next) => {
    res.send(err.message);
  })
  .listen(config.webserver.port);

process.on('unhandledRejection', (reason) => {
  throw reason;
});
