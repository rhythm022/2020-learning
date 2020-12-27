const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RemoveWebpackPlugin = require('./remove-comments-plugin');
module.exports = {
  entry: './src/index.js',
  // entry:'./src/style.css',
  mode: 'none',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack App JJ',
      template: './src/index.html',
    }),
    new HtmlWebpackPlugin({
      filename: 'about.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {from: 'public', to: 'public'},
      ],
    }),
    new RemoveWebpackPlugin(),

  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'output'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.md$/,
        use: [
          './markdown-loader',
        ],
      },
    ],
  },
};
