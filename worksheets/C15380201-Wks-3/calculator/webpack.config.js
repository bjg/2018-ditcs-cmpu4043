const path = require("path");

module.exports = {
  //first place that webpack looks to run.
    entry: "./src/index.js",
    devtool: "inline-source-map",
    devServer: {
      //output to this folder
        contentBase: "./dist"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "main.js"
    },
    module: {
        rules: [
            {
              //tells webpack to use the css loader on css files
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
