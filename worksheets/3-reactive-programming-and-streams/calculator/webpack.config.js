module.exports = {
    entry:"./src/index.js",
    output: {
        
        path: __dirname + "/public",
        filename: "bundle.js"
    },
    devServer:{
        contentBase: __dirname + "/public"
    }
}