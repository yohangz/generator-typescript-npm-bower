/**
 * Gulp source watch tasks.
 */

'use strict';

var path = require('path'),
    gulp = require('gulp-help')(require('gulp')),
    runSequence = require('run-sequence'),
<% if (bower) { -%>
    browserSync = require('browser-sync').create();
<% } -%>
    conf = require('./conf');

/**
 * Gulp source watch task.
 * Run tslint, jshint<% if (styles) { if (scss) { -%> and sass lint<% } else { -%> and css lint<% }} -%> -> run clean build, clean tmp -> run watch source scripts,<% if (bower) { -%>, watch example<% } -%> and watch build scripts<% if (styles) { if (scss) { -%> and watch scss<% } else { -%> and watch css<% }} -%> in parallel.
 * @param done - done callback function.
 */
gulp.task('watch', function (done) {
    runSequence(['jshint', 'tslint'<% if (styles) { if (scss) { -%>, 'sass-lint'<% } else { -%>, 'css-lint'<% }} -%>], ['clean-build', 'clean-tmp'], ['watch-source'<% if (bower) { -%>, 'watch-example'<% } -%>, 'watch-build-scripts'<% if (styles) { if (scss) { -%>, 'watch-scss'<% } else { -%>, 'watch-css'<% }} -%>],
<% if (bower) { -%>
    function () {
        browserSync.init({
          server: {
            baseDir: ['example', 'bower'],
            routes: {
              "/bower": "bower"
            }
          }
        });
        done();
      });
<% } else { -%>
     done);
<% } -%>
});
<% if (bower) { -%>

/**
 * Reload browser.
 */
gulp.task('reload', function () {
  browserSync.reload();
});

/**
 * Gulp watch example.
 * Watch changes in example files on change run reload browser.
 */
gulp.task('watch-example', function () {
  gulp.watch(path.join(conf.paths.example, conf.path_pattern.any), function () {
    gulp.start('reload');
  });
});
<% } -%>

/**
 * Gulp watch source.
 * Watch changes in source files on change and run tslint<% if (bower) { -%> -> bower-watch -> reload browser<% } -%>.
 */
gulp.task('watch-source', function(){
    gulp.watch([
      path.join(conf.paths.test, conf.path_pattern.ts),
      path.join(conf.paths.src, conf.path_pattern.ts)
    ], function() {
<% if (bower) { -%>
         runSequence('tslint', 'bower-watch', 'reload');
<% } else { -%>
         gulp.start('tslint');
<% } -%>
    });
});

/**
 * Gulp watch build scripts.
 * Watch changes in build process helper files -> run jshint.
 */
gulp.task('watch-build-scripts', function(){
  gulp.watch([
    path.join(conf.paths.gulp, conf.path_pattern.js), conf.paths.gulpFile<% if (bower) { -%>, conf.paths.karmaConf, conf.paths.karmaCoverageConf <% } -%>
  ], function() {
    gulp.start('jshint');
  });
});

<% if (styles) { if (scss) { -%>
/**
 * Gulp watch scss scripts.
 * Watch changes in style scss files on change run scss lint -> compile-scss -> copy-css -> reload browser.
 */
gulp.task('watch-scss', function () {
  gulp.watch(path.join(conf.paths.styles, conf.path_pattern.scss), function () {
    runSequence('sass-lint', 'compile-scss', 'copy-css', 'reload');
  });
});
<% } else { -%>
/**
 * Gulp watch css scripts.
 * Watch changes in style css files on change run css lint -> min-css -> copy-css -> reload browser.
 */
gulp.task('watch-css', function () {
  gulp.watch(path.join(conf.paths.styles, conf.path_pattern.css), function () {
    runSequence('css-lint', 'min-css', 'copy-css', 'reload');
  });
});
<% }} -%>



