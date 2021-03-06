'use strict';
var generators = require('yeoman-generator');
var originUrl = require('git-remote-origin-url');
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

    this.option('github-account', {
      type: String,
      required: true,
      desc: message.githubAccount
    });
  },

  initializing: function () {
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath(this.options.generateInto, '.gitattributes')
    );

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath(this.options.generateInto, '.gitignore')
    );

    var done = this.async();

    originUrl(this.destinationPath(this.options.generateInto)).then(function (url) {
      this.originUrl = url;
      done();
    }.bind(this), function () {
      done();
    }.bind(this));
  },

  writing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

    var repository = '';
    if (this.originUrl) {
      repository = this.originUrl;
    } else {
      repository = this.options.githubAccount + '/' + this.options.name;
    }

    this.pkg.repository = this.pkg.repository || repository;

    this.fs.writeJSON(this.destinationPath(this.options.generateInto, 'package.json'), this.pkg);
  },

  end: function () {
    this.spawnCommandSync('git', ['init'], {
      cwd: this.destinationPath(this.options.generateInto)
    });

    if (!this.originUrl) {
      var repoSSH = this.pkg.repository;
      if (this.pkg.repository && this.pkg.repository.indexOf('.git') === -1) {
        repoSSH = 'git@github.com:' + this.pkg.repository + '.git';
      }
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
        cwd: this.destinationPath(this.options.generateInto)
      });
    }
  }
});
