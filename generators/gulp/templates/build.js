/**
 * Gulp build task.
 */

'use strict';

var gulp = require('gulp-help')(require('gulp')),
    runSequence = require('run-sequence'),
    $ = require('gulp-load-plugins')(),
    conf = require('./conf');

/**
 * Gulp typings install task.
 * Report errors.
 */
gulp.task("typings-install",function(done){
  gulp.src(conf.paths.typings_json)
    .pipe($.typings())
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT))
    .on('end', function(){
      done();
    })
    .resume();
});

/**
 * Gulp build task.
 * Tsd-install -> build scripts -> run CI test via gulp test task.
 * @param done - done callback function.
 */
gulp.task('build', function (done) {
  runSequence('typings-install','build-scripts','test',done);
});
