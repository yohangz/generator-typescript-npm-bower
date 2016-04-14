/**
 * Gulp copy task.
 */

'use strict';

var path = require('path'),
    gulp = require('gulp-help')(require('gulp')),
    conf = require('./conf');

/**
 * Gulp copy css task.
 * Copy css files in .cssTmp to bower and npm directories.
 */
gulp.task('copy-css', function(done) {
    gulp.src(path.join(conf.paths.cssTmp, conf.path_pattern.css))
<% if (bower) { -%>
        .pipe(gulp.dest(conf.paths.bower))
<% } -%>
        .pipe(gulp.dest(conf.paths.lib))
        .on('end', function(){
          done();
        });
});

