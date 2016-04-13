/**
 * Gulp css minify tasks.
 */

'use strict';

var gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    $ = require('gulp-load-plugins')();

/**
 * Gulp minify css task.
 * Run cssmin.
 * Rename the bundle with min.
 * Notify created file size with the name.
 * Report errors.
 */
gulp.task('min-css', function () {
  return gulp.src(conf.paths.styles.css)
    .pipe($.cssmin())
    .pipe($.concat(conf.files.BOWER_MIN_CSS))
    .pipe($.notify({
      "message": conf.files.BOWER_MIN_CSS + " file size ",
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
