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
      required: false,
      defaults: true,
      desc: message.browser
    });

    this.option('styles', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: message.styles
    });

    this.option('scss', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: message.scss
    });

    this.option('bower', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: message.bower
    });
  },

  writing: function () {

    this.fs.copyTpl(
      this.templatePath('CHANGELOG.md'),
      this.destinationPath(this.options.generateInto, 'CHANGELOG.md'),
      {
        date: moment().format("DD-MM-YYYY"),
        styles: this.options.browser && this.options.styles,
        scss: this.options.browser && this.options.browser && this.options.scss
      }
    );

    var pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath(this.options.generateInto, 'README.md'),
      {
        projectName: this.options.name,
        description: this.options.description,
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
  }
});
