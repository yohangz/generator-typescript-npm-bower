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

    this.option('description', {
      type: String,
      required: true,
      desc: 'Project description'
    });

    this.option('githubAccount', {
      type: String,
      required: true,
      desc: 'User github account'
    });

    this.option('authorName', {
      type: String,
      required: true,
      desc: 'Author name'
    });

    this.option('authorUrl', {
      type: String,
      required: true,
      desc: 'Author url'
    });

    this.option('styles', {
      type: Boolean,
      required: false,
      defaults: false,
      desc: 'Include CSS'
    });

    this.option('scss', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Use SCSS extension'
    });

    this.option('bower', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: 'Include bower component'
    });
  },

  writing: function () {

    this.fs.copy(
      this.templatePath('CHANGELOG.md'),
      this.destinationPath(this.options.generateInto, 'CHANGELOG.md'));

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
        styles:this.options.styles,
        scss:this.options.scss,
        bower:this.options.bower
      }
    );
  }
});
