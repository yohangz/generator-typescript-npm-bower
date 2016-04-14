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

    this.option('testFramework', {
      type: String,
      required: false,
      defaults: 'jasmine',
      desc: message.testFramework
    });
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('karma.conf.js'),
      this.destinationPath(this.options.generateInto, 'karma.conf.js'),
      {
        testFramework: this.options.testFramework
      }
    );

    this.fs.copyTpl(
      this.templatePath('karma-coverage.conf.js'),
      this.destinationPath(this.options.generateInto, 'karma-coverage.conf.js'),
      {
        testFramework: this.options.testFramework
      }
    );
  }
});
