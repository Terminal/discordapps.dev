/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": false}] */

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const webpack = require('webpack');

const webserver = require('./index');
const webpackConfig = require('./webpack.config')({}, {
  mode: 'development'
});

const compiler = webpack(webpackConfig);
const app = express();

const devMiddleware = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
});

app
  .use(
    devMiddleware
  )
  .use(webpackHotMiddleware(compiler));

process.on('SIGINT', () => {
  console.log('Goodnight!');

  // Close stuff
  devMiddleware.close();
});

webserver(app);
