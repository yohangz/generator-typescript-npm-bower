/**
 * Gulp sass build tasks.
 */

'use strict';

var scsslint = require('gulp-scss-lint'),
  minifyCss = require('gulp-minify-css'),
  gulp = require('gulp-help')(require('gulp')),
  conf = require('./conf'),
  runSequence = require('run-sequence'),
  $ = require('gulp-load-plugins')();

/**
 * Gulp compile scss task.
 * Initialize sourcemaps.
 * Run sass.
 * Notify created file size with the name.
 * Report errors.
 */
gulp.task('compile-scss', function () {
  return gulp.src(conf.paths.styles)
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
  return gulp.src(conf.paths.styles)
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
  return gulp.src(conf.paths.cssTmp + '/' + conf.files.BOWER_CSS)
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


/**
 * Gulp build css task.
 * Clean css temporary directory and css files in distribution directories -> run compile sccs and generate minified file -> copy css files.
 * @param done - done callback function.
 */
gulp.task('build-css',function(done) {
  runSequence(['clean-css-tmp','clean-css'],'compile-scss-min','copy-css',done);
});
