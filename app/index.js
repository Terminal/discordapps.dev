require('./helpers/logo');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const r = require('./modules/rethinkdb');
const auth = require('./modules/passport');
const RDBStore = require('session-rethinkdb')(session);
const authRouter = require('./router/auth');
const botsRouter = require('./router/bots');
const imgRouter = require('./router/img');
const config = require('../config');
const fs = require('fs');
const { exec } = require('child_process');

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
      message: 'Welcome to the discordbots.uk API server. Please read https://docs.terminal.ink/ls for more info',
      user: req.user || {},
      ok: true,
    });
  })
  .use('/auth', authRouter)
  .use('/bots', botsRouter)
  .use('/img', imgRouter)
  .use((req, res) => res.status(404).json({
    message: 'Not Found',
    ok: false,
  }));

// Remove old socket
if (typeof config.webserver.port !== 'number') {
  fs.unlinkSync(config.webserver.port, (err) => { if (err) console.error(err); });
}

// Create a socket, or listen to a port
console.log('Listening on', config.webserver.port);
app.listen(config.webserver.port);

// Chown the new socket
if (typeof config.webserver.port !== 'number') {
  exec(`chown ${config.webserver.sock_owner} ${config.webserver.port}`);
}
