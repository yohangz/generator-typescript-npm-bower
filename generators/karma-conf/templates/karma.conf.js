// Karma configuration

'use strict';

module.exports = function (config) {

    var tsify = require('tsify');

    config.set({

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine','browserify'],

        // list of files / patterns to load in the browser
        files: [
            'typings/browser.d.ts',
            'src/**/*.ts',
            'test/**/*.ts'
        ],

        browserify: {
            debug: true,
            plugin: [tsify],
            extensions: ['.ts', '.js']
        },

        // list of files to exclude
        exclude: [],

        // web server port
        port: 9876,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity,

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'typings/browser.d.ts': ['browserify'],
            'src/**/*.ts': ['browserify'],
            'test/**/*.ts': ['browserify']

        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress']

    });
};
