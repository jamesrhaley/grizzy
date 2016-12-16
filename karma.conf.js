const webpackConfig = require('./webpack.test.config.babel')({env: 'test'})
const fileGlob = 'src/**/*.test.js'

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [fileGlob],
    preprocessors: {
      ['src/*.test.js']: ['webpack'],
      ['src/**/*.test.js']: ['webpack'],
    },
    webpack: webpackConfig,
    //webpackMiddleware: {noInfo: true},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  })
}