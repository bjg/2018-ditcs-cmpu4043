// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

const HTMLWebpackPlugin = require('html-webpack-plugin');//import plugin
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'),
  JS: path.resolve(__dirname, 'src/js'),
};

// Webpack configuration
module.exports = {
	mode:'development',
  entry: path.join(paths.JS, 'script.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
  },
  //use html plugin to inject into the app
  plugins:[
	new HTMLWebpackPlugin({
		template:path.join(paths.SRC, 'stopwatch.html'),
	}), 	
	new ExtractTextPlugin('stylesheet.bundle.css'),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
	  },
		{
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: 'css-loader',
        }),
      }	  
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};