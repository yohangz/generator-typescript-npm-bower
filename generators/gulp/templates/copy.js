
/**
 * Gulp copy task.
 */

'use strict';

var gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf');

/**
 * Gulp copy css task.
 * Copy css files in .cssTmp to bower and npm directories.
 */
gulp.task('copy-css', function() {
    gulp.src(conf.paths.cssTmp + '/*.css')
        .pipe(gulp.dest(conf.paths.bower))
        .pipe(gulp.dest(conf.paths.lib));
});

