'use strict';
var generators = require('yeoman-generator');
var moment = require('moment');
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

    this.option('description', {
      type: String,
      required: true,
      desc: message.description
    });

    this.option('githubAccount', {
      type: String,
      required: true,
      desc: message.githubAccount
    });

    this.option('authorName', {
      type: String,
      required: true,
      desc: message.authorName
    });

    this.option('authorUrl', {
      type: String,
      required: true,
      desc: message.authorUrl
    });

    this.option('browser', {
      type: Boolean,
      required: true,
      defaults: true,
      desc: message.browser
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

    this.option('bower', {
      type: Boolean,
      required: true,
      defaults: true,
      desc: message.bower
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
      this.templatePath('CHANGELOG.md'),
      this.destinationPath(this.options.generateInto, 'CHANGELOG.md'),
      {
        date: moment().format("DD-MM-YYYY"),
        styles: this.options.browser && this.options.styles,
        scss: this.options.browser && this.options.browser && this.options.scss,
        browser: this.options.browser,
        bower: this.options.browser && this.options.bower,
        testFramework: this.options.testFramework
      }
    );

    var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.options.generateInto, 'README.md'),
      {
        projectName: this.options.name,
        description: this.options.description,
        testFramework: this.options.testFramework,
        githubAccount: this.options.githubAccount,
        author: {
          name: this.options.authorName,
          url: this.options.authorUrl
        },
        license: pkg.license,
        styles: this.options.browser && this.options.styles,
        scss: this.options.browser && this.options.browser && this.options.scss,
        bower: this.options.browser && this.options.bower,
        browser: this.options.browser
      }
    );

    this.fs.copy(
      this.templatePath('CONTRIBUTING.md'),
      this.destinationPath(this.options.generateInto, 'CONTRIBUTING.md')
    );

    this.fs.copy(
      this.templatePath('PULL_REQUEST_TEMPLATE.md'),
      this.destinationPath(this.options.generateInto, 'PULL_REQUEST_TEMPLATE.md')
    );

  }
});
