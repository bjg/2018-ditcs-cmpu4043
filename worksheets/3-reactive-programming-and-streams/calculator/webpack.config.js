// We are using node's native package 'path'
// https://nodejs.org/api/path.html
const path = require('path');

// Import our plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Constant with our paths
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js'),
};

// Webpack configuration
module.exports = {
	entry: path.join(paths.JS, 'calculator.js'),
	mode: 'none',
	output:
	{
		path: paths.DIST,
		filename: 'app.bundle.js'
	},

	// Tell webpack to use html plugin
	// index.html is used as a template in which it'll inject bundle app.
	plugins:
	[
		new HtmlWebpackPlugin({
			template: path.join(paths.SRC, 'calculator.html'),
		}),
		// CSS will be extracted to this bundle
		new ExtractTextPlugin('style.bundle.css'),
	],

	// Loader configuration -> ADDED @ BABEL
	// We are telling webpack to use "babel-loader" for .js and .jsx files
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					'babel-loader',
				],
			},
			// CSS loader to CSS files
			// Files will be handled by css loader and then passed to the extract text plugin
			// which will write it to the file we defined above
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					use: 'css-loader',
				}),
			}
		],
	},

	// Enable importing JS files without specifying their extensions
	//
	// So we can write:
	// import MyComponent from './my-component';
	//
	// Instead of:
	// import MyComponent from './my-component.jsx';
	resolve: {
		extensions: ['.js', '.jsx'],
	},
};

	/*
	// Dev server configuraton -> REMOVED @ IMPORT PLUGIN
	// NOw it uses our "src" folder as a starting point
	devServer:
	{
		contentBase: paths.SRC,
	},
	*/
