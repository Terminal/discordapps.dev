const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    client: [
      '@babel/polyfill',
      'whatwg-fetch',
      path.join(__dirname, 'src', 'client.js')
    ],
    bundle: [
      '@babel/polyfill',
      'whatwg-fetch',
      path.join(__dirname, 'src', 'bundle.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    publicPath: '/'
  },
  context: path.resolve(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'css-hot-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, // translates CSS into CommonJS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          } // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};


module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    config.devtool = 'source-map';
    config.mode = 'development';
    config.entry.bundle.unshift('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000');
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return config;
};
