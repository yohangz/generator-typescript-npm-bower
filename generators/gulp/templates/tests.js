/**
 * Gulp test tasks.
 */

'use strict';

var path = require('path'),
  gulp = require('gulp-help')(require('gulp')),
  runSequence = require('run-sequence'),
  conf = require('./conf'),
<% if (browser) { -%>
  Server = require('karma').Server,
<% } -%>
  remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul'),
  $ = require('gulp-load-plugins')();

<% if (browser) { -%>
/**
 * Shows the available launchers.
 */
var Launcher = {
  Chrome: 'Chrome',
  PhantomJs: 'PhantomJS'
};

/**
 * Run unit tests with the given options.
 * @param karmaConf Karma file.
 * @param singleRun Flag determine run tests only once.
 * @param launcher Launching browser.
 * @param done Test done callback function.
 */
function runTestsCI (karmaConf,singleRun, launcher, done) {
  Server.start({
    configFile: karmaConf,
    singleRun: singleRun,
    autoWatch: !singleRun,
    browsers: [launcher]
  }, function() {
    done();
  });
}

/**
 * Gulp test task do CI test.
 * Single Run with PhantomJs.
 * @param done - done callback function.
 */
gulp.task('test', function(done) {
  runTestsCI(conf.paths.karmaConf, true, Launcher.PhantomJs, done);
});

/**
 * Gulp development build test task.
 * Single Run with Chrome.
 * @param done - done callback function.
 */
gulp.task('dev-test', function(done) {
  runTestsCI(conf.paths.karmaConf, false, Launcher.Chrome, done);
});

/**
 * Gulp coverage test with karma coverage configuration.
 * Single Run with PhantomJs.
 * @param done - done callback function.
 */
gulp.task('coverage-test',['coverage-build'], function(done) {
  runTestsCI(conf.paths.karmaCoverageConf, true, Launcher.PhantomJs, done);
});

/**
 * Gulp coverage task.
 * Cleans temporary created files in sources -> cleans coverage folder -> run coverage test with PhantomJs -> remap istanbul support -> clean temporary generated files.
 * @param done - done callback function.
 */
gulp.task('coverage', 'Run tests and generate coverage', function(done) {
  runSequence('clean-source-tmp','clean-coverage','coverage-test','remap-istanbul','clean-source-tmp',done);
});
<% } else { -%>
/**
 * Gulp pre coverage test with mocha and istanbul configuration.
 */
gulp.task('pre-test', ['coverage-build'], function() {
  return gulp.src(path.join(conf.paths.src, conf.path_pattern.js))
    .pipe($.istanbul({
      includeUntested: true
    }))
    .pipe($.istanbul.hookRequire());
});

var runTest = function(reporters, done) {
  var mochaError;

  gulp.src(path.join(conf.paths.test, conf.path_pattern.js))
    .pipe($.plumber())
    .pipe($.mocha({
      reporter: 'spec'
    }))
    .on('error', function (error) {
      mochaError = error;
    })
    .pipe($.istanbul.writeReports({
      dir: conf.paths.coverage,
      reporters: reporters,
      reportOpts: {
        dir: conf.paths.coverage
      }
    }))
    .on('end', function () {
      done(mochaError);
    });
};

/**
 * Gulp coverage test with mocha and istanbul configuration.
 * @param done - done callback function.
 */
gulp.task('coverage-test', ['pre-test'], function(done) {
  runTest(['json', 'text', 'text-summary'], done);
});

/**
 * Gulp summary test with mocha and istanbul configuration.
 * @param done - done callback function.
 */
gulp.task('summary-test', ['pre-test'], function(done) {
  runTest(['text', 'text-summary'], done);
});

/**
 * Gulp coverage task.
 * Cleans temporary created files in sources -> cleans coverage folder -> run coverage test -> remap istanbul support -> clean temporary generated files.
 * @param done - done callback function.
 */
gulp.task('coverage', 'Run tests and generate coverage', function(done) {
  runSequence('clean-source-tmp', 'clean-coverage', 'coverage-test', 'remap-istanbul', 'clean-source-tmp', done);
});

/**
 * Gulp test task.
 * Cleans temporary created files in sources -> run summary test -> clean temporary generated files.
 * @param done - done callback function.
 */
gulp.task('test', 'Run tests and generate coverage', function(done) {
  runSequence('clean-source-tmp', 'summary-test', 'clean-source-tmp', done);
});
<% } -%>

/**
 * Gulp coverage build task.
 * clean tmp -> tmp scripts
 */
gulp.task('coverage-build', function(done){
  runSequence('clean-source-tmp','tmp-scripts', done);
});

/**
 * Gulp remap istanbul task.
 * RemapIstanbul will access the coverage-final.json and generate reports.
 * Report errors.
 */
gulp.task('remap-istanbul', function () {
  return gulp.src(path.join(conf.paths.coverage, 'coverage-final.json'))
    .pipe(remapIstanbul({
      reports: {
        'html': path.join(conf.paths.coverage, conf.paths.reportDir),
        fail: true
      }
    }))
    .on('error', conf.errorHandler(conf.errors.title.TYPESCRIPT));
});
