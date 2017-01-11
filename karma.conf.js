process.env.BABEL_ENV = 'test';
const webpackConfig = require('./webpack.test.config.babel')({env: 'test'});
const testGlob = 'src/**/**/**/*.test.js';

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [testGlob],
    preprocessors: {
      [testGlob]: ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},

    reporters: ['coverage', 'mocha'],

    coverageReporter: {
      check: {
        global: {
          statements: 98,
          branches: 95,
          functions: 98,
          lines: 98,
        },
      },
      reporters: [
        {type: 'lcov', dir: 'coverage/', subdir: '.'},
        {type: 'json', dir: 'coverage/', subdir: '.'},
        {type: 'text-summary'},
      ],
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,
  })
}