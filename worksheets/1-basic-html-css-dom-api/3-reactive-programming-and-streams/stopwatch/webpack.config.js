// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// Constant with our paths
const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'src'),
    JS: path.resolve(__dirname, 'src/js'),
};

// Webpack configuration
module.exports = {
    entry: path.join(paths.JS, 'stopwatch.js'),
    output: {
        path: paths.DIST,
        filename: 'stopwatch.bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC,'index.html'),
        }),
    ],
};