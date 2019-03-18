const path = require('path');
const autoprefixer = require('autoprefixer');
const loaderUtils = require('loader-utils');
const nodeExternals = require('webpack-node-externals');

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
              getLocalIdent: (context, localIdentName, localName, options) => {
                // Replicate `create-react-app`'s getLocalIdent
                const fileNameOrFolder = /index.module.(sass|scss|css)$/.test(context.resourcePath) ? '[folder]' : '[name]';
                const hash = loaderUtils.getHashDigest(context.resourcePath + localName, 'md5', 'base64', 5);

                const className = loaderUtils.interpolateName(context, `${fileNameOrFolder}_${localName}__${hash}`, options);
                return className.replace('.module_', '_')
              }
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
  }
};
