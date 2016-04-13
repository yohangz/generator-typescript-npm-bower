/**
 * Gulp Version Bump task.
 */

'use strict';
var gulp = require('gulp-help')(require('gulp')),
  git = require('gulp-git'),
  bump = require('gulp-bump'),
  filter = require('gulp-filter'),
  tag_version = require('gulp-tag-version');

/**
 * Bumping version number and tagging the repository with it.
 * Please read http://semver.org/
 *
 * You can use the commands
 *
 *     gulp patch     # makes v0.1.0 → v0.1.1
 *     gulp feature   # makes v0.1.1 → v0.2.0
 *     gulp release   # makes v0.2.1 → v1.0.0
 *
 * To bump the version numbers accordingly after you did a patch,
 * introduced a feature or made a backwards-incompatible release.
 */

function inc(importance) {
  // get all the files to bump version in
  return gulp.src(['./package.json', './bower.json'])
    // bump the version number in those files
    .pipe(bump({type: importance}))
    // save it back to filesystem
    .pipe(gulp.dest('./'))
    // commit the changed version number
    .pipe(git.commit('bumps package version'))
    // read only one file to get the version number
    .pipe(filter('package.json'))
    // **tag it in the repository**
    .pipe(tag_version());
}

/**
 * Gulp patch version task.
 * Increment patch version commit files and tag version.
 */
gulp.task('patch', function() {
  return inc('patch');
});

/**
 * Gulp feature version task.
 * Increment feature version commit files and tag version.
 */
gulp.task('feature', function() {
  return inc('minor');
});

/**
 * Gulp release version task.
 * Increment release version commit files and tag version.
 */
gulp.task('release', function() {
  return inc('major');
});
