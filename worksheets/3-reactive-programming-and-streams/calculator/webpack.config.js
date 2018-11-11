const path = require("path");

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/js/app.js",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ],
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            use: [
                'babel-loader',
            ],
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        }
        ],
    }
}