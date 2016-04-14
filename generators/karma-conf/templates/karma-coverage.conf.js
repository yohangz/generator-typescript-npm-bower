'use strict';

module.exports = function(config) {

  config.set({
    frameworks: ['<%= testFramework %>', 'browserify'],
    files: [
      'src/**/*.js',
      'test/**/*.js',
      { pattern: 'src/**/*.ts', included: false, watched: false },
      { pattern: 'test/**/*.ts', included: false, watched: false },
      { pattern: 'src/**/*.js.map', included: false, watched: true },
      { pattern: 'test/**/*.js.map', included: false, watched: true }
    ],
    preprocessors: {
      'src/**/*.js': ['browserify'],
      'test/**/*.js': ['browserify']
    },
    browserify: {
      transform: ['browserify-istanbul']
    },
    browsers: [
      'Chrome'
    ],
    reporters: ['progress', 'coverage'],
      coverageReporter: {
          type: 'json',
          subdir: '.',
          file: 'coverage-final.json'
      },
    singleRun: true

  });
};
