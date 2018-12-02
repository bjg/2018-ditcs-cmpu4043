module.exports = {
    entry:"./src/index.js",
    output: {
        
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    devServer:{
        contentBase: __dirname + "/public"
    },
    module: {
        rules: [
            {loader: "babel-loader", test: /\.js/},
            {test: /\.s?css/,
            use:[
                "style-loader",
                "css-loader",
                "sass-loader"
            ]}
        ]
    }
}
