/**
 * Gulp inject task.
 */

'use strict';

var path = require('path'),
  gulp = require('gulp-help')(require('gulp')),
  $ = require('gulp-load-plugins')(),
  conf = require('./conf');

/**
 * Inject bower build output with a script tag to html.
 * Notify injected minified js file.
 * Report Errors.
 */
gulp.task('inject-js', function () {
  gulp.src(path.join(conf.paths.example, conf.files.EXAMPLE_HTML))
    .pipe($.inject(gulp.src(path.join(conf.paths.bower, conf.files.BOWER_MIN_JS),{read: false}),{relative:true}))
    .pipe($.notify({
      "message": conf.files.BOWER_MIN_JS + " injected to html",
      "onLast": true
    }))
    .pipe(gulp.dest(conf.paths.example))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});

<% if (styles) { -%>
/**
 * Inject minified css build output with a link tag to html.
 * Notify injected minified css file.
 * Report Errors.
 */
gulp.task('inject-css', function () {
  gulp.src(path.join(conf.paths.example, conf.files.EXAMPLE_HTML))
    .pipe($.inject(gulp.src(path.join(conf.paths.bower, conf.files.BOWER_MIN_CSS),{read: false}),{relative:true}))
    .pipe($.notify({
      "message": conf.files.BOWER_MIN_JS + " injected to html",
      "onLast": true
    }))
    .pipe(gulp.dest(conf.paths.example))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});
<% } -%>
