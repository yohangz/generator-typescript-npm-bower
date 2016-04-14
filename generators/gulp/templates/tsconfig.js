/**
 * Gulp tsconfig.json update.
 */

'use strict';

var gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    tsconfig = require('gulp-tsconfig-files'),
    stylish = require('jshint-stylish'),
    jshint = require('gulp-jshint'),
    tslint = require('gulp-tslint');


/**
 * Get the locations of the all .ts files via tsconfig.json
 */
var tsFilesGlob = (function (c) {
  return c.filesGlob || c.files || conf.path_pattern.ts;
}(require(conf.paths.tsconfig_json)));


/**
 * Gulp tsconfig update task.
 * Update files section in tsconfig.json.
 * Report errors.
 */
gulp.task('tsconfig-update', function () {
    gulp.src(tsFilesGlob).pipe(tsconfig()).on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});


/**
 * Gulp tslint task.
 * Run TSLint and report errors.
 * Report errors on pipe process.
 */
gulp.task('tslint', function () {
    return gulp.src(tsFilesGlob)
        .pipe(tslint())
        .pipe(tslint.report(conf.reports.tslint_report_type, {
            emitError: false
        }))
        .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});


/**
 * Gulp jshint task.
 * Run JShint.
 * Use jshint stylish to show errors.
 */
gulp.task('jshint', function () {
  return gulp.src([conf.paths.gulp + conf.path_pattern.js, conf.paths.gulpFile, conf.paths.karmaConf, conf.paths.karmaCoverageConf])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});



