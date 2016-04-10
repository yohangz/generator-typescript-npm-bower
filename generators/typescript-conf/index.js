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

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
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
