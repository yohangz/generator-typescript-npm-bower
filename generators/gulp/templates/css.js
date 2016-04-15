/**
 * Gulp css minify tasks.
 */

'use strict';

var path = require('path'),
    gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')();

/**
 * Gulp bundle css task.
 * Concat css files.
 * Notify created file size with the name.
 * Report errors.
 */
gulp.task('bundle-css', function () {
  return gulp.src(conf.paths.styles.css)
    .pipe($.concat(conf.files.BUNDLE_CSS))
    .pipe($.notify({
      "message": conf.files.BUNDLE_CSS + " file size ",
      "onLast": true
    }))
    .pipe($.size())
    .pipe(gulp.dest(conf.paths.cssTmp))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});

/**
 * Gulp minify css task.
 * Rename the bundle with min.
 * Run cssmin.
 * Notify created file size with the name.
 * Report errors.
 */
gulp.task('min-css',['bundle-css'], function () {
  return gulp.src(path.join(conf.paths.cssTmp, conf.files.BUNDLE_CSS))
    .pipe($.rename(conf.files.BUNDLE_MIN_CSS))
    .pipe($.cssmin())
    .pipe($.notify({
      "message": conf.files.BUNDLE_MIN_CSS + " file size ",
      "onLast": true
    }))
    .pipe($.size())
    .pipe(gulp.dest(conf.paths.cssTmp))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});

/**
 * Gulp css lint task.
 * Run csslint.
 */
gulp.task('css-lint', function() {
  return gulp.src(conf.paths.styles.css)
    .pipe($.csslint())
    .pipe($.csslint.reporter())
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});
