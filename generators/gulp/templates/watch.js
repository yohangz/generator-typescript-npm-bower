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
    runSequence('clean-js-tmp', ['jshint', 'tslint'<% if (styles) { if (scss) { -%>, 'scss-lint'<% } else { -%>, 'css-lint'<% }} -%>], 'tmp-watch-scripts', ['watch-scripts', 'watch-build-scripts'<% if (styles) { if (scss) { -%>, 'watch-scss-scripts'<% } else { -%>, 'watch-css-scripts'<% }} -%>], done);
});

/**
 * Gulp watch scripts.
 * Watch source script changes -> run tslint -> watch .tmp source changes.
 */
gulp.task('watch-scripts', function(){
    gulp.watch([
      path.join(conf.paths.test, conf.path_pattern.ts),
      path.join(conf.paths.src, conf.path_pattern.ts)
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
    path.join(conf.paths.gulp, conf.path_pattern.js), conf.paths.gulpFile<% if (browser) { -%>, conf.paths.karmaConf, conf.paths.karmaCoverageConf <% } -%>
  ], function() {
    gulp.start('jshint');
  });
});

<% if (styles) { if (scss) { -%>
/**
 * Gulp watch scss scripts.
 * Watch changes in build process helper files -> run scss lint.
 */
gulp.task('watch-scss-scripts', function(){
    gulp.watch([
        conf.paths.styles.scss
    ], function() {
        gulp.start('scss-lint');
    });
});
<% } else { -%>

/**
 * Gulp watch css scripts.
 * Watch changes in build process helper styles files -> run css lint.
 */
gulp.task('watch-css-scripts', function(){
  gulp.watch([
    conf.paths.styles.css
  ], function() {
    gulp.start('css-lint');
  });
});
<% }} -%>






