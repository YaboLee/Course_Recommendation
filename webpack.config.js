const webpack = require('webpack');
const config = {
    devtool: 'eval-source-map',
    entry:  __dirname + '/static/js/index.jsx',
    output: {
        path: __dirname + '/static/dist/',
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css']
    },
    module: {
        rules: [
          {
            test: /\.jsx?/,
            exclude: /node_modules/,
            loader: 'babel-loader',
          }
        ]
      },
};
module.exports = config;