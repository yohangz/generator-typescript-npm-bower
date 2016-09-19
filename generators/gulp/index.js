'use strict';
var generators = require('yeoman-generator');
var path = require('path');
var _ = require('lodash');
var extend = _.merge;
var message = require('../message');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: message.generateInto
    });

    this.option('name', {
      type: String,
      required: true,
      desc: message.name
    });

    this.option('styles', {
      type: Boolean,
      required: true,
      defaults: false,
      desc: message.styles
    });

    this.option('scss', {
      type: Boolean,
      required: true,
      defaults: true,
      desc: message.scss
    });

    this.option('fonts', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: message.fonts
    });

    this.option('bower', {
      type: Boolean,
      required: true,
      defaults: true,
      desc: message.bower
    });

    this.option('testFramework', {
      type: String,
      required: true,
      defaults: 'jasmine',
      desc: message.testFramework
    });
  },

  writing: {
    package: function () {
      var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

      extend(pkg, {
        dependencies: {
          'lodash': '4.13.1'
        },
        devDependencies: {
          'del': '2.2.2',
          'gulp': '3.9.1',
          'gulp-bump': '2.4.0',
          'gulp-concat': '2.6.0',
          'gulp-filter': '4.0.0',
          'gulp-git': '1.8.0',
          'gulp-help': '1.6.1',
          'gulp-jshint': '2.0.1',
          'gulp-load-plugins': '1.3.0',
          "gulp-nsp": "2.4.2",
          'gulp-sourcemaps': '1.6.0',
          'gulp-streamify': '1.0.2',
          'gulp-tag-version': '1.3.0',
          'gulp-tsc': '1.2.3',
          'gulp-tsconfig-files': '0.4.0',
          'gulp-tslint': '6.1.1',
          'gulp-typedoc': '2.0.0',
          'gulp-typescript': '2.13.6',
          'gulp-typings': '2.0.4',
          'gulp-uglify': '2.0.0',
          'gulp-util': '3.0.7',
          'jshint': '2.9.3',
          'jshint-stylish': '2.2.1',
          'path': '0.12.7',
          'remap-istanbul': '0.6.4',
          'require-dir': '0.3.0',
          'run-sequence': '1.2.2',
          'tsify': '1.0.7',
          'tslint': '3.15.1',
          'typedoc': '0.4.5',
          'typescript': '1.8.10',
          'vinyl-source-stream': '1.1.0',
          'watchify': '3.7.0'
        },
        scripts: {
          'typings-install': 'gulp typings-install',
          'test': 'gulp test',
          'watch': 'gulp watch',
          'clean': 'gulp clean-build',
          'build': 'gulp build',
          'coverage': 'gulp coverage',
          'doc': 'gulp typedoc',
          'tsconfig-update': 'gulp tsconfig-update',
          'patch': 'gulp build && gulp patch',
          'feature': 'gulp build && gulp feature',
          'release': 'gulp build && gulp release',
          'prepublish': 'npm run build'
        }
      });

      if (this.options.bower) {
        pkg.devDependencies['browser-sync'] = '2.16.0';
        pkg.devDependencies['browserify'] = '13.0.1';
        pkg.devDependencies['browserify-istanbul'] = '2.0.0';
        pkg.devDependencies['karma'] = '1.3.0';
        pkg.devDependencies['karma-browserify'] = '5.1.0';
        pkg.devDependencies['karma-chrome-launcher'] = '2.0.0';
        pkg.devDependencies['karma-coverage'] = '1.1.1';
        pkg.devDependencies['karma-phantomjs-launcher'] = '1.0.2';
        pkg.devDependencies['karma-remap-istanbul'] = '0.2.1';
        pkg.devDependencies['phantomjs-prebuilt'] = '2.1.12';

        pkg.devDependencies['gulp-inject'] = '4.1.0';
        pkg.devDependencies['gulp-notify'] = '2.2.0';
        pkg.devDependencies['gulp-size'] = '2.1.0';
        pkg.devDependencies['gulp-rename'] = '1.2.2';

        pkg.scripts['dev-test'] = 'gulp dev-test';

        switch (this.options.testFramework) {
          case 'jasmine':
            pkg.devDependencies['jasmine'] = '2.5.2';
            pkg.devDependencies['jasmine-core'] = '2.5.2';
            pkg.devDependencies['karma-jasmine'] = '1.0.2';
            break;
          case 'mocha':
            pkg.devDependencies['chai'] = '3.5.0';
            pkg.devDependencies['karma-mocha'] = '1.1.1';
            pkg.devDependencies['mocha'] = '3.0.2';
            break;
        }

        if (this.options.styles) {
          pkg.devDependencies['gulp-concat'] = '2.6.0';
          pkg.devDependencies['gulp-cssmin'] = '0.1.7';
        }

        // if (this.options.bower) {
        //   pkg.devDependencies['gulp-inject'] = '4.1.0';
        //   pkg.devDependencies['gulp-notify'] = '2.2.0';
        //   pkg.devDependencies['gulp-size'] = '2.1.0';
        //   pkg.devDependencies['gulp-rename'] = '1.2.2';
        // }

        if (this.options.styles && this.options.scss) {
          pkg.devDependencies['gulp-sass'] = '2.3.2';
          pkg.devDependencies['gulp-sass-lint'] = '1.2.0';
        }

        if (this.options.styles && !this.options.scss) {
          pkg.devDependencies['gulp-csslint'] = '1.0.0';
        }
      } else {
        pkg.devDependencies['gulp-istanbul'] = '1.1.1';

        switch (this.options.testFramework) {
          case 'jasmine':
            pkg.devDependencies['jasmine'] = '2.5.2';
            pkg.devDependencies['jasmine-core'] = '2.5.2';
            pkg.devDependencies['gulp-jasmine'] = '2.4.1';
            break;
          case 'mocha':
            pkg.devDependencies['chai'] = '3.5.0';
            pkg.devDependencies['mocha'] = '3.0.2';
            pkg.devDependencies['gulp-mocha'] = '3.0.1';
            pkg.devDependencies['gulp-plumber'] = '1.1.0';
            break;
        }
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
          styles: this.options.bower && this.options.styles
        }
      );

      this.fs.copyTpl(
        this.templatePath('conf.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'conf.js'),
        {
          projectName: this.options.name,
          bower: this.options.bower,
          styles: this.options.bower && this.options.styles,
          scss: this.options.bower && this.options.styles && this.options.scss,
          fonts: this.options.bower && this.options.styles && this.options.fonts
        }
      );

      if (this.options.styles) {
        this.fs.copyTpl(
          this.templatePath('copy.js'),
          this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'copy.js'),
          {
            bower: this.options.bower,
            fonts: this.options.bower && this.options.styles && this.options.fonts
          }
        );
      }

      if (this.options.bower) {
        this.fs.copyTpl(
          this.templatePath('inject.js'),
          this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'inject.js'),
          {
            bower: this.options.bower,
            styles: this.options.bower && this.options.styles && this.options.styles
          }
        );
      }

      this.fs.copyTpl(
        this.templatePath('lint.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'lint.js'),
        {
          bower: this.options.bower
        }
      );

      if (this.options.bower && this.options.styles && this.options.scss) {
        this.fs.copy(
          this.templatePath('scss.js'),
          this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'scss.js')
        );
      }

      if (this.options.bower && this.options.styles && !this.options.scss) {
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
          styles: this.options.bower && this.options.styles,
          scss: this.options.bower && this.options.styles && this.options.scss,
          fonts: this.options.bower && this.options.styles && this.options.fonts
        }
      );

      this.fs.copyTpl(
        this.templatePath('tests.js'),
        this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'tests.js'),
        {
          bower: this.options.bower,
          testFramework: this.options.testFramework
        }
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
          styles: this.options.bower && this.options.styles,
          scss: this.options.bower && this.options.scss,
          fonts: this.options.bower && this.options.styles && this.options.fonts,
          bower: this.options.bower
        }
      );
    }
  }
});
