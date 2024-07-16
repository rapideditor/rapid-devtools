const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    popup: './src/popup/popup.jsx'
  },
  output:{
    path: path.join(__dirname, '/dist'),
    filename: '[name].jsx'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.css']
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve('src/manifest.json'),
          to: path.resolve('dist') },
        { from: path.resolve('src/assets'),
          to: path.resolve('dist/assets') }
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Rapid Devtool',
      filename: 'popup.html',
      chunks: ['popup']
    })
  ]
}