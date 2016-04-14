/**
 * Gulp Typescript Documentation Generator task.
 */

'use strict';

var path = require('path'),
    gulp = require('gulp-help')(require('gulp')),
    $ = require('gulp-load-plugins')(),
    tsConf = require('./../tsconfig.json').compilerOptions,
    conf = require('./conf');

/**
 * Gulp typeDoc task.
 * Used to generate API documentation for typescript sources.
 * Report errors.
 */
gulp.task('typedoc',['clean-doc'], function () {
  return gulp
    .src(path.join(conf.paths.src, conf.path_pattern.ts))
    .pipe($.typedoc({
      module: tsConf.module,
      target: tsConf.target,
      includeDeclarations: false,

      out: conf.paths.docs,
      json: path.join(conf.paths.docs, conf.files.JSON_DOC),

      name: conf.files.PROJECT_NAME,
      ignoreCompilerErrors: true,
      version: true

    }))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});
