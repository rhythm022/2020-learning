// ./webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

const allModes = [
  'eval',
  'cheap-eval-source-map',
  'cheap-module-eval-source-map',
  'eval-source-map',
  'cheap-source-map',
  'cheap-module-source-map',
  'inline-cheap-source-map',
  'inline-cheap-module-source-map',
  'source-map',
  'inline-source-map',
  'hidden-source-map',
  'nosources-source-map'
]

module.exports = allModes.map(item => ({
  devtool: item,
  mode: 'none',
  entry: './src/app.js',
  output: {
    filename: `js/${item}.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${item}.html`
    })
  ]
}))



































// // ./webpack.config.js

// const path = require('path')
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// /** @type {import('webpack').Configuration} */
// const config = {
//   devtool: 'source-map',
//   devServer: {
//     contentBase: path.join(__dirname, 'static'),
//     compress: true,
//     port: 9000,
//     proxy: {
//       '/api': {
//         target: 'https://api.github.com',
//         pathRewrite: {
//           '^/api': ''
//         },
//         changeOrigin: true,
//       }
//     }
//   },
//   entry: './src/app.js',
//   mode: 'none',
//   output: {

//     filename: 'app.js',

//     path: path.join(__dirname, 'output')

//   },
//   plugins: [
//     new CleanWebpackPlugin(),
//     new HtmlWebpackPlugin({
//       template: './index.html'
//     })
//   ],

// }


// module.exports = config