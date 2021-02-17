// ./webpack.config.js

const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const RemoveCommentsPlugin = require("./remove-comments-plugin");

/** @type {import('webpack').Configuration} */
const config = {
    entry: './src/app.js',
    mode: 'none',
    output: {

        filename: 'app.js',

        path: path.join(__dirname, 'output')

    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename:'about.html',
            template:'./src/index-another.html'
        }),
        new CopyPlugin({
            patterns: [
              { from: "static", to: "static" }
            ],
          }),
        new RemoveCommentsPlugin(),

       ],

}


module.exports = config