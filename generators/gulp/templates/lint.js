/**
 * Gulp common lint tasks.
 */

'use strict';

var path = require('path'),
    gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    stylish = require('jshint-stylish'),
    $ = require('gulp-load-plugins')();

/**
 * Gulp tslint task.
 * Run TSLint and report errors.
 * Report errors on pipe process.
 */
gulp.task('tslint', function () {
    return gulp.src(conf.tsFilesGlob)
        .pipe($.tslint({
          formatter: conf.reports.tslint_report_type
        }))
        .pipe($.tslint.report())
        .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});

/**
 * Gulp jshint task.
 * Run JShint.
 * Use jshint stylish to show errors.
 */
gulp.task('jshint', function () {
  return gulp.src([path.join(conf.paths.gulp, conf.path_pattern.js), conf.paths.gulpFile<% if (bower) { -%>, conf.paths.karmaConf, conf.paths.karmaCoverageConf <% } -%>])
    .pipe($.jshint())
    .pipe($.jshint.reporter(stylish));
});
