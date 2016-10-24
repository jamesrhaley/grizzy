var path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "grizzy.js",
    path: path.join(__dirname, "lib"),
    libraryTarget: "umd",
    library: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};