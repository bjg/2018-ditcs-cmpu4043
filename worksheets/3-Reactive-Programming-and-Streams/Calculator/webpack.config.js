const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'), // source folder path -> ADDED IN THIS STEP
  JS: path.resolve(__dirname, 'src/js'),
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.JS, 'calculator.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },
  // Dev server configuration -> ADDED IN THIS STEP
  // Now it uses our "src" folder as a starting point
  devServer: {
    contentBase: paths.SRC,
  },
    
    plugins: [
        new HtmlWebpackPlugin({
          template: path.join(paths.SRC, 'calculator-skin.html'),
        }),
        new ExtractTextPlugin('style.bundle.css'),
    ],
    
    
  module: {
    rules: [
      // CSS loader to CSS files -> ADDED IN THIS STEP
      // Files will get handled by css loader and then passed to the extract text plugin
      // which will write it to the file we defined above
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      }
    ],
  },
};


// Tell webpack to use html plugin -> ADDED IN THIS STEP
// index.html is used as a template in which it'll inject bundled app.
