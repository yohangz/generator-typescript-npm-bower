/**
 * Gulp tsconfig.json update.
 */

'use strict';

var gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    tsconfig = require('gulp-tsconfig-files');


/**
 * Get the locations of the all .ts files via tsconfig.json
 */
var tsFilesGlob = (function (c) {
  return c.filesGlob || c.files || conf.path_pattern.ts;
}(require(conf.paths.tsconfig_json)));


/**
 * Gulp tsconfig update task.
 * Update files section in tsconfig.json.
 * Report errors.
 */
gulp.task('tsconfig-update', function () {
    gulp.src(tsFilesGlob).pipe(tsconfig()).on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});




