/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": false}] */

const webserver = require('./index');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config')({}, {
  mode: 'development'
});

const compiler = webpack(webpackConfig);

const app = express();


app
  .use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath
    })
  )
  .use(webpackHotMiddleware(compiler));

webserver(app);
