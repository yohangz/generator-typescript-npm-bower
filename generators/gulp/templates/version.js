var gulp = require('gulp-help')(require('gulp')),
    bump = require('gulp-bump');

/**
 * Gulp bump version scripts.
 * Update the patch version of bower and package json.
 */
gulp.task('bump', function(){
    gulp.src(<% if (bower) { -%>['./bower.json', './package.json']<% } else { -%>'./package.json'<% } -%>)
        .pipe(bump({
            type:'patch'
        }))
        .pipe(gulp.dest('./'));
});
