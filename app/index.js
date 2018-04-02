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
  .use(cookieParser(config.webserver.secret))
  .use(session({
    secret: config.webserver.secret,
    resave: true,
    saveUninitialized: true,
    proxy: true,
    store,
  }))
  .use(auth.initialize())
  .use(auth.session())
  .set('json spaces', 2)
  .get('/', (req, res) => {
    res.json({
      message: 'Welcome to the ls.terminal.ink API server',
      user: req.user || {},
    });
  })
  .use('/auth', authRouter)
  .use('/bots', botsRouter);

app.listen(8080);
