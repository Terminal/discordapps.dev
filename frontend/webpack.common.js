'use strict';

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    './App.js',
    'whatwg-fetch',
  ],
  output: {
    publicPath: '/',
  },
  context: path.resolve(path.join(__dirname, 'src')),
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      'node_modules',
    ],
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js(x)?/,
        exclude: /node_modules/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg|woff|woff2|ttf|otf|eot)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: 'index.ejs',
    }),
  ],
};
