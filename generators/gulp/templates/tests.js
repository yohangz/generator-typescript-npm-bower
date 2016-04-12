/**
 * Gulp test tasks.
 */

'use strict';

var path = require('path'),
  gulp = require('gulp-help')(require('gulp')),
  runSequence = require('run-sequence'),
  conf = require('./conf'),
  Server = require('karma').Server,
  remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');

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
 * Gulp coverage build task.
 * clean tmp -> tmp scripts
 */
gulp.task('coverage-build', function(done){
  runSequence('clean-source-tmp','tmp-scripts',done);
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

/**
 * Gulp coverage task.
 * Cleans temporary created files in sources -> cleans coverage folder -> run coverage test with PhantomJs -> remap istanbul support -> clean temporary generated files.
 * @param done - done callback function.
 */
gulp.task('coverage', 'Run tests and generate coverage', function(done) {
  runSequence('clean-source-tmp','clean-coverage','coverage-test','remap-istanbul','clean-source-tmp',done);
});
