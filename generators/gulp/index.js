'use strict';
var generators = require('yeoman-generator');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });
  },

  initializing: function () {
    this.fs.copy(
      this.templatePath('gulpfile.js'),
      this.destinationPath(this.options.generateInto, 'gulpfile.js')
    );

    this.fs.copy(
      this.templatePath('build.js'),
      this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'build.js')
    );

    this.fs.copy(
      this.templatePath('clean.js'),
      this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'clean.js')
    );

    this.fs.copy(
      this.templatePath('conf.js'),
      this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'conf.js')
    );

    this.fs.copy(
      this.templatePath('copy.js'),
      this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'copy.js')
    );

    this.fs.copy(
      this.templatePath('inject.js'),
      this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'inject.js')
    );

    this.fs.copy(
      this.templatePath('sass.js'),
      this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'sass.js')
    );

    this.fs.copy(
      this.templatePath('scripts.js'),
      this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'scripts.js')
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

    this.fs.copy(
      this.templatePath('watch.js'),
      this.destinationPath(path.join(this.options.generateInto, 'gulp'), 'watch.js')
    );
  }
});
