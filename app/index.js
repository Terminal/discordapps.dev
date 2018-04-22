require('./helpers/logo');
const express = require('express');
const bodyParser = require('body-parser');
const r = require('./modules/rethinkdb');
const auth = require('./modules/passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RDBStore = require('session-rethinkdb')(session);
const authRouter = require('./router/auth');
const botsRouter = require('./router/bots');
const config = require('../config');

const store = new RDBStore(r);
const app = express();

app.use(bodyParser.json())
  .use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', `${config.webserver.frontend.protocol}://${config.webserver.frontend.uri}`);
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Vary', '*');
    next();
  })
  .use(cookieParser(config.webserver.secret))
  .use(session({
    secret: config.webserver.secret,
    resave: true,
    saveUninitialized: true,
    store,
  }))
  .use(auth.initialize())
  .use(auth.session())
  .set('json spaces', 2)
  .get('/', (req, res) => {
    res.json({
      message: 'Welcome to the ls.terminal.ink API server. Please read https://docs.terminal.ink/ls for more info',
      user: req.user || {},
      ok: true,
    });
  })
  .use('/auth', authRouter)
  .use('/bots', botsRouter)
  .use((req, res) => res.status(404).json({
    message: 'Not Found',
    ok: false,
  }));

app.listen(config.webserver.port);
