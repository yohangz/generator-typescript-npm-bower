/**
 * Gulp script build tasks.
 */

'use strict';

var path = require('path'),
    gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf'),
    source = require('vinyl-source-stream'),
<% if (bower) { -%>
    tsify = require('tsify'),
    browserify = require('browserify'),
<% } -%>
    runSequence = require('run-sequence'),
    tsConf = require('./../tsconfig.json').compilerOptions,
    $ = require('gulp-load-plugins')();

/* Initialize TS Project */
var tsProject = $.typescript.createProject(conf.paths.tsconfig);

/* Concat all source, test and typings TS files  */
var tsFiles = [].concat(conf.paths.src + conf.paths.sub_src, conf.paths.test + conf.paths.sub_src, conf.paths.dts.browser);

<% if (bower) { -%>
/**
 * Gulp minify js task.
 * Streamify and uglify, the output of the gulp bower task.
 * Rename uglified js file.
 * Notify created file size with the name.
 * Report errors.
 */
gulp.task('build-bower',['bower'], function () {
  return gulp.src(conf.paths.bower + conf.paths.bundle)
    .pipe($.streamify($.uglify()))
    .pipe($.streamify($.rename(conf.files.BOWER_MIN_JS)))
    .pipe(gulp.dest(conf.paths.bower))
    .pipe($.notify({
      "message": conf.files.BOWER_MIN_JS + " file size ",
      "onLast": true
    }))
    .pipe($.size())
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});
<% } -%>

<% if (bower) { -%>
/**
 * Gulp bower task.
 * Clean bower directory.
 * Browserify will generate single .js file with the source map support(debug:true option will add sourceMap support).
 * Tsify to compile the sources.
 * Notify created file size with the name.
 * Report errors.
 */
gulp.task('bower', ['clean-bower'], function () {
  var bundler = browserify({
    basedir: './',
    debug: true
  })
    .add([].concat(conf.paths.src + conf.paths.main, conf.paths.dts.browser))
    .plugin(tsify);

  return bundler.bundle()
    .pipe(source(conf.files.BOWER_JS))
    .pipe(gulp.dest(conf.paths.bower))
    .pipe($.notify({
      "message": conf.files.BOWER_JS + " file size ",
      "onLast": true
    }))
    .pipe($.size())
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});
<% } -%>


/**
 * Gulp npm task.
 * Clean lib directory.
 * Typescript compiler will generate all .js files and d.ts references for the source files.
 * Report errors.
 */
gulp.task('npm',['clean-lib'], function () {
  return gulp.src([].concat(conf.paths.src + conf.paths.sub_src, conf.paths.dts.browser))
    .pipe($.tsc(tsConf))
    .pipe(gulp.dest(conf.paths.lib))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});


/**
 * Gulp temporary scripts generation task for coverage.
 * Typescript compiler will generate all .js files and maps references for the source files.
 * Report errors.
 */
gulp.task('tmp-scripts', function() {
  var res = gulp.src(tsFiles, {
      base: '.'
    })
    .pipe($.sourcemaps.init())
    .pipe($.typescript(tsProject))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
  return res.js
    .pipe($.sourcemaps.write('.', {
      // Return relative source map root directories per file.
      includeContent: false,
      sourceRoot: function (file) {
        var sourceFile = path.join(file.cwd, file.sourceMap.file);
        return path.relative(path.dirname(sourceFile), file.cwd);
      }
    }))
    .pipe(gulp.dest('.'));
});


/**
 * Gulp watch temporary scripts task for error checking.
 * Typescript compiler will generate all .js files and maps references for the source files.
 * Report errors.
 */
gulp.task('tmp-watch-scripts',['clean-js-tmp'], function() {
  var res = gulp.src(tsFiles, {
      base: '.'
    })
    .pipe($.typescript(tsProject))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
  return res.js
    .pipe(gulp.dest(conf.paths.jsTmp));
});


/**
 * Gulp nsp scripts task.
 * Run node Security check.
 * @param done - done callback function.
 */
gulp.task('nsp', function (done) {
  $.nsp({
    package: path.resolve('package.json')
  }, done);
});


<% if (styles) { -%>
/**
 * Gulp build css task.
 * Clean css temporary directory and css files in distribution directories -> run compile sccs and generate minified file -> copy css files.
 * @param done - done callback function.
 */
gulp.task('build-css',function(done) {
  runSequence(['clean-css-tmp','clean-css'],<% if (scss) { -%> 'compile-scss-min'<% } else { -%> 'min-css'<% } -%>, 'copy-css',done);
});
<% } -%>

/**
 * Gulp build scripts task.
 * Clean build -> show tslint errors and update tsconfig.json in parallel -> run npm and bower in parallel -> minify js -> inject bower js build to html ->
 * build css -> inject minified css build to html
 * @param done - done callback function.
 */
gulp.task('build-scripts',function(done) {
  runSequence('nsp','clean-build',['tslint', 'tsconfig-update'],<% if (bower) { -%> ['npm', 'build-bower'], 'inject-js'<% } else { -%> 'npm'<% } -%>,<% if (styles) { -%> 'build-css', 'inject-css',<% } -%> done);
});
