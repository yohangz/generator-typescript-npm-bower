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
      this.templatePath('.jshintrc'),
      this.destinationPath(this.options.generateInto, 'jshintrc')
    );

    this.fs.copy(
      this.templatePath('tslint.json'),
      this.destinationPath(this.options.generateInto, 'tslint.json')
    );
  }
});
