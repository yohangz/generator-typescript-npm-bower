/**
 * Gulp common lint tasks.
 */

'use strict';

var gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    stylish = require('jshint-stylish'),
    jshint = require('gulp-jshint'),
    tslint = require('gulp-tslint');

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