const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: 'cheap-module-source-map',
  entry: {
    popup: './src/popup/popup.jsx',
    devtools: './src/devtools/devtools.js',
    background:'./src/service-worker/background.js',
    panel: './src/panel/panel.jsx',
    'content-script': './src/content/content-script.js',
    injected: './src/injected/injected.js'
  },
  output:{
    filename: '[name].js'
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
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
         use: [
            "style-loader",
            "css-loader"
         ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
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
    ...getHtmlPlugins(["popup", "devtools", "panel"])
  ]
}

function getHtmlPlugins(chunks) {
  return chunks.map(
      (chunk) =>
          new HtmlWebpackPlugin({
              title: "React DevTool",
              filename: `${chunk}.html`,
              chunks: [chunk],
          })
  );
}