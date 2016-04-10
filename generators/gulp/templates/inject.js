/**
 * Gulp inject task.
 */

'use strict';

var gulp = require('gulp-help')(require('gulp')),
    $ = require('gulp-load-plugins')(),
    conf = require('./conf');


/**
 * Inject bower build output with a script tag to html
 * Report Errors.
 */
gulp.task('inject-js', function () {
    gulp.src(conf.paths.example + '/' + conf.files.EXAMPLE_HTML)
        .pipe($.inject(gulp.src(conf.paths.bower + '/' + conf.files.BOWER_MIN_JS, {read: false}), {relative: true}))
        .pipe(gulp.dest(conf.paths.example))
        .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});