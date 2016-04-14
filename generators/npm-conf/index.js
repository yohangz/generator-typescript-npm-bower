'use strict';
var generators = require('yeoman-generator');
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
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('npmignore'),
      this.destinationPath(this.options.generateInto, '.npmignore')
    );

    this.fs.copy(
      this.templatePath('npmrc'),
      this.destinationPath(this.options.generateInto, '.npmrc')
    );
  }
});
