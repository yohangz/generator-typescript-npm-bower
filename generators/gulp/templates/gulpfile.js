/**
 * Welcome to your gulpfile!
 * The gulp tasks are splitted in several files in the gulp directory
 */

'use strict';

var gulp = require('gulp-help')(require('gulp')),
    requireDir = require('require-dir');

/**
 * This will load all js in the gulp directory
 * in order to load all gulp tasks
 */
requireDir('./gulp');

/**
 * Default task clean temporaries directories and launch the
 * main optimization build task
 */
gulp.task('default', function () {
  gulp.start('build');
});
