const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const RemoveWebpackPlugin = require('./remove-comments-plugin');

module.exports = {
  optimization: { // production模式下会自动优化的项，如果在平时也要生效则需配置
    //?? 当sideEffects: true && usedExports: true的webpack要打包一个模块，该模块声明为sideEffects:false的同时该模块的所有导出都未被使用，这个模块完全不会被打包
    // usedExports: true,// 在一个模块所有导出中，移除未被使用的导出
    // minimize: true,// 在一个模块中，移除未被使用的变量、且代码会被压缩打包进bundle
    // sideEffects: true,//?? 检查一个模块的sideEffects声明，对于未声明sideEffects字段的，其模块内副作用代码全保留，诸如console.log、Number.prototype.pad等
    //?? - sideEffects为false，其模块内副作用代码全删除
    //?? - sideEffects为列表的，其模块内副作用代码全删除

    // concatenateModules: true, // 原来每个module会打包进bundle的一个函数中，设为false后，所有module尽可能打包进一个函数中
    splitChunks: {
      chunks: 'all',
    },

  },
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    // hot: true,
    proxy: {
      //此时请求localhost:8080/api/user
      // - 相当于请求https://api.github.com/users
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '',      //pathRewrite重写后请求localhost:8080/api/user
          // - 相当于请求https://api.github.com/users，这才正常
        },
        changeOrigin: true,//localhost:8080/api/user对github来说是莫名其妙的，changeOriginshi origin 正常
      },
    },
    contentBase: path.join(__dirname, 'static'),//静态文件
    compress: false,
    port: 9000,
  },
  entry: {
    index: './src/index.js',
    about: './src/about.js',
  },
  mode: 'none',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack App JJ',
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: 'about.html',
      chunks: ['about'],
    }),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {from: 'static', to: 'static'},
    //   ],
    // }),
    new RemoveWebpackPlugin(),
    // new webpack.NamedModulesPlugin(),
    // new webpack.HotModuleReplacementPlugin(),

  ],
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
