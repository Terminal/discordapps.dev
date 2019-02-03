const express = require('express');
const template = require('./views/template');
const path = require('path');
const ssr = require('./views/server');
const config = require('./config.json');

const initialState = {
  isFetching: false,
  apps: []
};

const webserver = (app) => {
  app
    // .get('/client', (req, res) => {
    //   const response = template('Client Side Rendered page');
    //   res.setHeader('Cache-Control', 'assets, max-age=604800');
    //   res.send(response);
    // })
    .use('/assets', express.static(path.resolve(__dirname, 'assets')))
    .use('/build', express.static(path.resolve(__dirname, 'build')))
    .get('/*', (req, res) => {
      const { preloadedState, content, context } = ssr(initialState, req.url);
      const response = template('Server Rendered Page', preloadedState, content);
      if (context.statusCode) res.status(context.statusCode);
      res.setHeader('Cache-Control', 'assets, max-age=604800');
      res.send(response);
    })
    .listen(config.port, () => {
      console.log(`Listening to port ${config.port}`);
    });
};

if (require.main === module) {
  webserver(express());
}

module.exports = webserver;
