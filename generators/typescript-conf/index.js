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

    this.option('name', {
      type: String,
      required: true,
      desc: message.name
    });
  },

  writing: function () {
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath(this.options.generateInto, 'tsconfig.json')
    );

    this.fs.copyTpl(
      this.templatePath('typings.json'),
      this.destinationPath(this.options.generateInto, 'typings.json'),
      {
        projectName: this.options.name
      }
    );
  }
});
