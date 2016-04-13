/**
 * Gulp sass build tasks.
 */

'use strict';

var path = require('path'),
    scsslint = require('gulp-scss-lint'),
    minifyCss = require('gulp-minify-css'),
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
    .pipe($.concat(conf.files.BOWER_CSS))
    .pipe($.notify({
      "message": conf.files.BOWER_CSS + " file size ",
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
gulp.task('scss-lint', function() {
  return gulp.src(conf.paths.styles.scss)
    .pipe(scsslint())
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
  return gulp.src(path.join(conf.paths.cssTmp, conf.files.BOWER_CSS))
    .pipe($.rename(conf.files.BOWER_MIN_CSS))
    .pipe(minifyCss())
    .pipe($.notify({
      "message": conf.files.BOWER_MIN_CSS + " file size ",
      "onLast": true
    }))
    .pipe($.size())
    .pipe(gulp.dest(conf.paths.cssTmp))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});




