// ./webpack.config.js

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
  devtool: 'eval-cheap-module-source-map',

  devServer: {
    hotOnly: true,
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 9000,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '',
        },
        changeOrigin: true,
      },
    },
  },
  entry: './src/app.js',
  mode: 'none',
  output: {

    filename: 'app.js',

    path: path.join(__dirname, 'output'),

  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.jpg$/i,
        use: ['file-loader'],
      },
    ],
    
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

};

module.exports = config;
