// ./webpack.config.js

const path = require('path')

/** @type {import('webpack').Configuration} */
const config = {
    entry: './src/app.js',
    mode: 'none',
    output: {

        filename: 'app.js',

        path: path.join(__dirname, 'output')

    },
    module: {
        rules: [
          {
            test: /\.css$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader
            use: [
                'style-loader',
                'css-loader'
            ]
          },
          {
            test: /\.md$/, // 根据打包过程中所遇到文件路径匹配是否使用这个 loader
            use: [
              'html-loader',
                './markdown-loader',
            ]
          },
        ]
      }

}


module.exports = config