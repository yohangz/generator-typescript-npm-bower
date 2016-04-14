'use strict';

module.exports = function(config) {

  config.set({
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['<%= testFramework %>', 'browserify'],

    // list of files / patterns to load in the browser
    files: [
      'src/**/*.js',
      'test/**/*.js',
      { pattern: 'src/**/*.ts', included: false, watched: false },
      { pattern: 'test/**/*.ts', included: false, watched: false },
      { pattern: 'src/**/*.js.map', included: false, watched: true },
      { pattern: 'test/**/*.js.map', included: false, watched: true }
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },


    browserify: {
      transform: ['browserify-istanbul']
    },

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'Chrome'
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    coverageReporter: {
        type: 'json',
        subdir: '.',
        file: 'coverage-final.json'
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
