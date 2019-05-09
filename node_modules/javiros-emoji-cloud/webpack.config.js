// node core dependencies
const path = require('path');
const fs = require('fs');

// node dependencies
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

let options = {
  entry: './src/emojicloud.js',
  target: 'web',
  output: {
    path: path.join(__dirname + '/', 'dist'),
    filename: 'emojicloud.js'
  },
  plugins: [
    // new UglifyJsPlugin(),
    new CopyWebpackPlugin([
      { from: './node_modules/wordcloud/src/wordcloud2.js', to: 'wordcloud.js' }])
  ],
  // externals: nodeModules()
  module: {
   loaders: [
     {
       test: /\.js$/,
       loader: 'babel-loader',
       query: {
         presets: ['es2015']
       }
     }
    ]
  }
}

function nodeModules() {
  let nodeModulesList = {};
  fs.readdirSync('node_modules').filter(x => ['.bin'].indexOf(x) === -1).forEach(mod => nodeModulesList[mod] = 'commonjs ' + mod);
  return nodeModulesList;
}

module.exports = options;