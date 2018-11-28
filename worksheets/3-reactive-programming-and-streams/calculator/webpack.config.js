const path = require('path');

const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  
  JS: path.resolve(__dirname, 'src/js'),
};

module.exports = {
  entry: path.join(paths.JS, 'app.js'),
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
        ],
      },
    ],
  },
 
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};