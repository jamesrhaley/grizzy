process.env.BABEL_ENV = 'test';
const webpackConfig = require('./webpack.test.config.babel')({env: 'test'})
const testGlob = 'src/**/*.test.js'
const testGlob2 = 'src/**/**/*.test.js'
// const sourceGlob = 'src/**/!(*.test|*.stub).js'

module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [testGlob, testGlob2],
    preprocessors: {
      [testGlob]: ['webpack'],
      [testGlob2]: ['webpack'],
    },
    webpack: webpackConfig,
    webpackMiddleware: {noInfo: true},
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      check: {
        global: {
          statements: 100,
          branches: 100,
          functions: 100,
          lines: 100,
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