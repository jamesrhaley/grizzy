var path = require('path');

var testPath = './test/src/';

var fs = require('fs');

// gather all test files
var entries = fs.readdirSync(testPath)
  .filter(function(file) {
    return file.match(/.*\.js$/);
  })
  .map(function(file) {
    return testPath + file;
  });

console.log(entries)
module.exports = {
  entry: entries,
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "test"),
    libraryTarget: "umd",
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
}