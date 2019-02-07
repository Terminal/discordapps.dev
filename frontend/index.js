const express = require('express');
const template = require('./views/template');
const path = require('path');
const ssr = require('./views/server');
const config = require('./config.json');
const r = require('./static/rethinkdb');
const bodyParser = require('body-parser');
const authRouter = require('./routers/auth');
const session = require('express-session');
const RDBStore = require('session-rethinkdb')(session);
const passport = require('./static/passport');

const initialState = {
  isFetchingApps: false,
  isFetchingAuth: false,
  apps: [],
  auth: false
};

const store = new RDBStore(r);

const webserver = (app) => {
  app
    // .get('/client', (req, res) => {
    //   const response = template('Client Side Rendered page');
    //   res.setHeader('Cache-Control', 'assets, max-age=604800');
    //   res.send(response);
    // })
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
      extended: true
    }))
    .use(session({
      secret: config.webserver.secret,
      resave: true,
      saveUninitialized: true,
      proxy: true,
      store
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use(express.static(path.resolve(__dirname, 'www-root')))
    .use(express.static(path.resolve(__dirname, 'build')))
    .use('/auth', authRouter)
    .get('/*', (req, res) => {
      const { preloadedState, content, context, helmet } = ssr(initialState, req.url);
      const response = template({
        initialState: preloadedState,
        content,
        helmet
      });
      if (context.statusCode) res.status(context.statusCode);
      res.setHeader('Cache-Control', 'assets, max-age=604800');
      res.send(response);
    });

  const http = app.listen(config.webserver.port, () => {
    console.log(`Listening to port ${config.webserver.port}`);
  });

  process.on('SIGINT', () => {
    console.log('Goodnight!');

    // Close stuff
    http.close();
    r.getPoolMaster().drain();

    setTimeout(() => {
      process.exit(0);
    }, 1000);
  });
};

if (require.main === module) {
  webserver(express());
}

module.exports = webserver;
