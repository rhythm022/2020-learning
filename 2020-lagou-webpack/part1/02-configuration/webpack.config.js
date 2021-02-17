// ./webpack.config.js

const path = require('path')

/** @type {import('webpack').Configuration} */
const config = {
    entry: './src/app.js',
    mode: 'none',
    output: {

        filename: 'app.js',

        path: path.join(__dirname, 'output')

    }

}


module.exports = config