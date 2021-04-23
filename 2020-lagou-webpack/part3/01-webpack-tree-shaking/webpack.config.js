// ./webpack.config.js

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
  optimization: {
    // minimize: true,
    // concatenateModules: true,
    usedExports: true,
    sideEffects: true,
  },
  // devtool:'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 9001,
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': ''
        },
        changeOrigin: true,
      }
    }
  },
  entry: './src/app.js',
  mode: 'none',
  output: {

    filename: 'app.js',

    path: path.join(__dirname, 'output')

  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ],

}


module.exports = config
