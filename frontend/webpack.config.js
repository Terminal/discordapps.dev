const path = require('path');

module.exports = {
  entry: {
    client: path.join(__dirname, 'src', 'client.js'),
    bundle: path.join(__dirname, 'src', 'bundle.js')
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
};
