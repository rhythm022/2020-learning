// ./webpack.config.js
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   title: 'Webpack Plugin Sample',
    //   template: './src/index.html'
    // }),
    new CopyWebpackPlugin({
      patterns: ['public'] // 需要拷贝的目录或者路径通配符
    })
  ]
}
