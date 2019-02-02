const path = require('path');

const client = {
  entry: {
    client: path.join(__dirname, 'src', 'client.js'),
    bundle: path.join(__dirname, 'src', 'bundle.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
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
            loader: 'style-loader',
            options: {
              sourceMap: true
            }
          }, // creates style nodes from JS strings
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
  }
};


module.exports = [
  client
];
