/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/** Project Name goes here */
var Project_Name ='<%= projectName %>';

/**
 *  The main paths of your project handle these with care
 */
exports.paths = {
  src: 'src',
  test: 'test',
<% if (bower) { -%>
  bower: 'bower',
<% } -%>
  lib: 'lib',
  jsTmp:'.jsTmp',
<% if (styles) { -%>
  cssTmp:'.cssTmp',
  styles: {
<% if (scss) { -%>
    scss:'styles/**/*.scss'
  <% } else { -%>
    css:'styles/**/*.css'
  <% } -%>
},
<% } -%>
  gulp:'gulp',
  gulpFile:'gulpfile.js',
  coverage: 'coverage',
  reportDir:'report',
  docs:'docs',
  example:'example',
  typings:{
    browser:'typings/browser.d.ts'
  },
  main:'/index.ts', /** If you change this you need to update the package.json as well */
<% if (bower) { -%>
  bundle: Project_Name + '.js',
<% } -%>
<% if (browser) { -%>
  karmaConf: __dirname + '/../karma.conf.js',
  karmaCoverageConf: __dirname + '/../karma-coverage.conf.js',
<% } -%>
  typings_json: __dirname + '/../typings.json',
  tsconfig_json: __dirname + '/../tsconfig.json'
};

/**
 *  The main file patterns goes here
 */
exports.path_pattern = {
  ts:'**/*.ts',
  js:'**/*.js',
<% if (styles) { -%>
<% if (scss) { -%>
  scss:'**/*/.scss',
<% } -%>
  css:'**/*.css',
<% } -%>
  map:'**/*.map',
  ktp_ts:'**/*.ktp.ts'
};

/**
 *  The main names of your project handle these with care
 */
exports.files = {
<% if (bower) { -%>
  BOWER_JS: Project_Name + '.js',
  BOWER_MIN_JS: Project_Name + '.min.js',
<% } -%>
<% if (styles) { -%>
  BOWER_CSS: Project_Name + '.css',
  BOWER_MIN_CSS: Project_Name + '.min.css',
<% } -%>
  PROJECT_NAME: Project_Name,
  JSON_DOC:'doc.json',
  EXAMPLE_HTML:'index.html'
};

/**
 *  The main report base constants of your project handle these with care
 */
exports.reports = {
  tslint_report_type:'verbose'
};

/**
 *  The main report base constants of your project handle these with care
 */
exports.errors = {
  title:{
    TYPESCRIPT:'Typescript'
  }
};

/**
 * Get the locations of the all .ts files via tsconfig.json
 */
exports.tsFilesGlob = (function (c) {
  "use strict";

  return c.filesGlob || c.files || '**/*.ts';
}(require(__dirname + '/../tsconfig.json')));


/**
 *  Common implementation for an error handler of a Gulp plugin
 */
exports.errorHandler = function(title) {
  'use strict';

  return function(err) {
    gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
    this.emit('end');
  };
};
