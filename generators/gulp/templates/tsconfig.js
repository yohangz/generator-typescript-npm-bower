/**
 * Gulp tsconfig.json update.
 */

'use strict';

var gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    tsconfig = require('gulp-tsconfig-files');

/**
 * Gulp tsconfig update task.
 * Update files section in tsconfig.json.
 * Report errors.
 */
gulp.task('tsconfig-update', function () {
    gulp.src(conf.tsFilesGlob).pipe(tsconfig()).on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});




