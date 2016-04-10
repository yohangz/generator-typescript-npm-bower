/**
 * Gulp source watch tasks.
 */

'use strict';

var path = require('path'),
    gulp = require('gulp-help')(require('gulp')),
    runSequence = require('run-sequence'),
    conf = require('./conf');

/**
 * Gulp source watch task.
 * Clean tmp -> tslint -> temporary watch scripts -> watch scripts.
 * @param done - done callback function.
 */
gulp.task('watch', function (done) {
    runSequence('clean-js-tmp', ['jshint', 'tslint','scss-lint'], 'tmp-watch-scripts', ['watch-scripts','watch-build-scripts','watch-scss-scripts'], done);
});

/**
 * Gulp watch scripts.
 * Watch source script changes -> run tslint -> watch .tmp source changes.
 */
gulp.task('watch-scripts', function(){
    gulp.watch([
        path.join(conf.paths.test, conf.paths.sub_src),
        path.join(conf.paths.src, conf.paths.sub_src)
    ], function() {
        runSequence('tslint','tmp-watch-scripts');
    });
});

/**
 * Gulp watch build scripts.
 * Watch changes in build process helper files -> run jshint.
 */
gulp.task('watch-build-scripts', function(){
    gulp.watch([
        conf.paths.gulp, conf.paths.gulpFile, conf.paths.karmaConf, conf.paths.karmaCoverageConf
    ], function() {
        gulp.start('jshint');
    });
});


/**
 * Gulp watch scss scripts.
 * Watch changes in build process helper files -> run scss lint.
 */
gulp.task('watch-scss-scripts', function(){
    gulp.watch([
        conf.paths.styles
    ], function() {
        gulp.start('scss-lint');
    });
});






