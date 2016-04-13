'use strict';
var generators = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var extend = _.merge;

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
    });

    this.option('styles', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Include CSS'
    });

    this.option('scss', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Use SCSS extension'
    });

    this.option('bower', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include bower component'
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

      extend(pkg, {
        dependencies: {
          'lodash': '4.8.2'
        },
        devDependencies: {
          'browserify': '13.0.0',
          'browserify-istanbul': '2.0.0',
          'del': '2.0.2',
          'gulp': '3.9.1',
          'gulp-bump': '2.1.0',
          'gulp-concat': '2.6.0',
          'gulp-help': '1.6.0',
          'gulp-inject': '4.0.0',
          'gulp-jasmine': '2.0.1',
          'gulp-jshint': '2.0.0',
          'gulp-load-plugins': '1.0.0-rc.1',
          'gulp-notify': '2.2.0',
          "gulp-nsp": "2.4.0",
          'gulp-rename': '1.2.2',
          'gulp-size': '2.1.0',
          'gulp-sourcemaps': '1.6.0',
          'gulp-streamify': '1.0.2',
          'gulp-tsc': '1.1.5',
          'gulp-tsconfig-files': '0.0.2',
          'gulp-tslint': '3.1',
          'gulp-typedoc': '1.2.1',
          'gulp-typescript': '2.12.2',
          'gulp-typings': '1.3.4',
          'gulp-uglify': '1.2.0',
          'gulp-util': '3.0.7',
          'jasmine': '2.3.1',
          'jasmine-ajax': '3.2.0',
          'jasmine-core': '2.4.1',
          'jshint': '2.9.1',
          'jshint-stylish': '2.1.0',
          'karma': '0.13.22',
          'karma-browserify': '5.0.3',
          'karma-chrome-launcher': '0.2.2',
          'karma-coverage': '0.5.5',
          'karma-jasmine': '0.3.7',
          'karma-phantomjs-launcher': '1.0.0',
          'karma-remap-istanbul': '0.0.5',
          'path': '0.12.7',
          'phantomjs-prebuilt': '2.1.7',
          'remap-istanbul': '0.5.1',
          'require-dir': '0.3.0',
          'run-sequence': '1.1.5',
          'tsify': '0.14.1',
          'typescript': '1.8.7',
          'vinyl-source-stream': '1.1.0',
          'watchify': '3.7.0'
        },
        scripts: {
          'typings': 'gulp typings-install',
          'test': 'gulp test',
          'dev test': 'gulp dev-test',
          'watch': 'gulp watch',
          'clean': 'gulp clean-build',
          'build': 'gulp build',
          'coverage': 'gulp coverage',
          'doc': 'gulp typedoc',
          'bump': 'gulp bump',
          'prepublish': 'npm run build'
        }
      });

      if (this.options.styles) {
        pkg.devDependencies['gulp-cssmin'] = '0.1.7';
      }

      if (this.options.styles && this.options.scss) {
        pkg.devDependencies['gulp-sass'] = '2.2.0';
        pkg.devDependencies['gulp-scss-lint'] = '0.3.9';
      }

      if (this.options.styles && !this.options.scss) {
        pkg.devDependencies['gulp-csslint'] = '0.3.0';
      }

      this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), pkg);
    },

    gulpfile: function () {
      this.fs.copy(
        this.templatePath('gulpfile.js'),
        this.destinationPath(this.options.generateInto, 'gulpfile.js')
      );

      this.fs.copy(
        this.templatePath('build.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'build.js')
      );

      this.fs.copyTpl(
        this.templatePath('clean.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'clean.js'),
        {
          bower: this.options.bower,
          styles: this.options.styles
        }
      );

      this.fs.copyTpl(
        this.templatePath('conf.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'conf.js'),
        {
          projectName: this.options.name,
          bower: this.options.bower,
          styles: this.options.styles,
          scss: this.options.scss
        }
      );

      if (this.options.styles) {
        this.fs.copyTpl(
          this.templatePath('copy.js'),
          this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'copy.js'),
          {
            bower: this.options.bower
          }
        );
      }

      if (this.options.styles || this.options.bower) {
        this.fs.copyTpl(
          this.templatePath('inject.js'),
          this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'inject.js'),
          {
            bower: this.options.bower,
            styles: this.options.styles
          }
        );
      }

      if (this.options.styles && this.options.scss) {
        this.fs.copy(
          this.templatePath('sass.js'),
          this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'sass.js')
        );
      }

      if (this.options.styles && !this.options.scss) {
        this.fs.copy(
          this.templatePath('css.js'),
          this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'css.js')
        );
      }

      this.fs.copyTpl(
        this.templatePath('scripts.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'scripts.js'),
        {
          bower: this.options.bower,
          styles: this.options.styles,
          scss: this.options.scss
        }
      );

      this.fs.copy(
        this.templatePath('tests.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'tests.js')
      );

      this.fs.copy(
        this.templatePath('tsconfig.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'tsconfig.js')
      );

      this.fs.copy(
        this.templatePath('tsdocs.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'tsdocs.js')
      );

      this.fs.copyTpl(
        this.templatePath('version.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'version.js'),
        {
          bower: this.options.bower
        }
      );

      this.fs.copyTpl(
        this.templatePath('watch.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'watch.js'),
        {
          styles: this.options.styles,
          scss: this.options.scss
        }
      );
    }
  }
});
