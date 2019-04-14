const path = require('path');
const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')
const webpack = require('webpack');

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
      })
    ]
  }
}

module.exports = {
  entry: ['@babel/polyfill', './server/index.js'],
  output: {
    path: path.resolve(__dirname, 'serverbuild'),
    filename: 'bundle.js'
  },
  externals: [nodeExternals()],
  target: 'node',
  node: {
    __dirname: false
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        sideEffects: true,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          postCSSLoader
        ]
      },
      {
        test: /\.scss$/,
        exclude: /\.module\.scss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
              sourceMap: true
            }
          },
          postCSSLoader,
          'sass-loader'
        ]
      },
      {
        test: /\.module\.scss$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              sourceMap: true,
              getLocalIdent: getCSSModuleLocalIdent
            }
          },
          postCSSLoader,
          'sass-loader',
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.html$/,
        use: 'raw-loader'
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'node-fetch'
    })
  ]
};
