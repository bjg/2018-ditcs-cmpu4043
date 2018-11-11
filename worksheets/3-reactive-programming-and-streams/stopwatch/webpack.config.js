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
        // CSS loader to CSS files -> ADDED IN THIS STEP
        // Files will get handled by css loader and then passed to the extract text plugin
        // which will write it to the file we defined above
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        }
        ],
    }
}