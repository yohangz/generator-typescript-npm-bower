'use strict';
var generators = require('yeoman-generator');

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
      this.templatePath('src/**/*.ts'),
      this.destinationPath(this.options.generateInto, 'src')
    );

    this.fs.copy(
      this.templatePath('test/**/*.ts'),
      this.destinationPath(this.options.generateInto, 'test')
    );

    this.fs.copy(
      this.templatePath('styles/**/*.scss'),
      this.destinationPath(this.options.generateInto, 'styles')
    );
  }
});
