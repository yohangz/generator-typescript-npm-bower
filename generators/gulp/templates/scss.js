/**
 * Gulp sass build tasks.
 */

'use strict';

var path = require('path'),
    sassLint = require('gulp-sass-lint'),
    gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')();

/**
 * Gulp compile scss task.
 * Initialize sourcemaps.
 * Run sass.
 * Notify created file size with the name.
 * Report errors.
 */
gulp.task('compile-scss', function () {
  return gulp.src(conf.paths.styles.scss)
    .pipe($.sourcemaps.init())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.concat(conf.files.BUNDLE_CSS))
    .pipe($.notify({
      "message": conf.files.BUNDLE_CSS + " file size ",
      "onLast": true
    }))
    .pipe($.size())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(conf.paths.cssTmp))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});

/**
 * Gulp scss lint task.
 * Run scsslint.
 */
gulp.task('sass-lint', function() {
  return gulp.src(conf.paths.styles.scss)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});

/**
 * Gulp minify scss to css task.
 * Run compile scss task as a dependency.
 * Rename css bundle.
 * Notify created file size with the name.
 * Report errors.
 */
gulp.task('compile-scss-min',['compile-scss'], function() {
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




