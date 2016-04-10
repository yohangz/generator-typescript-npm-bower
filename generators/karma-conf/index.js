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
      this.templatePath('karma.conf.js'),
      this.destinationPath(this.options.generateInto, 'karma.conf.js')
    );

    this.fs.copy(
      this.templatePath('karma-coverage.conf.js'),
      this.destinationPath(this.options.generateInto, 'karma-coverage.conf.js')
    );
  }
});
