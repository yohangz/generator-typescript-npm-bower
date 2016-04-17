'use strict';
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var _ = require('lodash');
var extend = _.merge;
var parseAuthor = require('parse-author');
var path = require('path');
var githubUsername = require('github-username');
var askName = require('inquirer-npm-name');
var chalk = require('chalk');
var message = require('../message');

module.exports = yeoman.Base.extend({
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.option('travis', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: message.travis
    });

    this.option('boilerplate', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: message.boilerplate
    });

    this.option('gulp', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: message.gulp
    });

    this.option('license', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: message.license
    });

    this.option('name', {
      type: String,
      required: false,
      desc: message.name
    });

    this.option('githubAccount', {
      type: String,
      required: false,
      desc: message.githubAccount
    });

    this.option('projectRoot', {
      type: String,
      required: false,
      defaults: 'lib',
      desc: message.projectRoot
    });

    this.option('readme', {
      type: String,
      required: false,
      desc: message.readme
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
      desc: message.browser
    });

    this.option('testFramework', {
      type: String,
      required: false,
      defaults: 'jasmine',
      desc: message.testFramework
    });
  },

  initializing: function () {
    this.pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    // Pre set the default props from the information we have at this point
    this.props = {
      name: this.pkg.name,
      description: this.pkg.description,
      version: this.pkg.version,
      homepage: this.pkg.homepage
    };

    if (_.isObject(this.pkg.author)) {
      this.props.authorName = this.pkg.author.name;
      this.props.authorEmail = this.pkg.author.email;
      this.props.authorUrl = this.pkg.author.url;
    } else if (_.isString(this.pkg.author)) {
      var info = parseAuthor(this.pkg.author);
      this.props.authorName = info.name;
      this.props.authorEmail = info.email;
      this.props.authorUrl = info.url;
    }
  },

  prompting: {
    showWelcome: function() {
      this.log(yosay(message.welcome));
      this.log(chalk.magenta(message.generator));
    },

    askForModuleName: function () {
      if (this.pkg.name || this.options.name) {
        this.props.name = this.pkg.name || _.kebabCase(this.options.name);
        return;
      }

      var done = this.async();

      askName({
        name: 'name',
        message: message.name,
        default: path.basename(process.cwd()),
        filter: _.kebabCase,
        validate: function (str) {
          return str.length > 0;
        }
      }, this, function (name) {
        this.props.name = name;
        done();
      }.bind(this));
    },

    askFor: function () {
      var done = this.async();

      var prompts = [{
        name: 'description',
        message: message.description,
        when: !this.props.description
      }, {
        name: 'homepage',
        message: message.homepage,
        when: !this.props.homepage
      }, {
        name: 'authorName',
        message: message.authorName,
        when: !this.props.authorName,
        default: this.user.git.name(),
        store: true
      }, {
        name: 'authorEmail',
        message: message.authorEmail,
        when: !this.props.authorEmail,
        default: this.user.git.email(),
        store: true
      }, {
        name: 'authorUrl',
        message: message.authorUrl,
        when: !this.props.authorUrl,
        store: true
      }, {
        name: 'keywords',
        message: message.keywords,
        when: !this.pkg.keywords,
        filter: function (words) {
          return words.split(/\s*,\s*/g);
        }
      }, {
        type: 'confirm',
        name: 'browser',
        message: message.browser,
        default: true
      }, {
        type: 'confirm',
        name: 'bower',
        message: message.bower,
        default: true,
        when: function (props) {
          return props.browser;
        }
      }, {
        type: 'confirm',
        name: 'styles',
        message: message.styles,
        default: false,
        when: function (props) {
          return props.browser;
        }
      }, {
        type: 'confirm',
        name: 'scss',
        message: message.scss,
        default: true,
        when: function (props) {
          return props.browser && props.styles;
        }
      }, {
        type: 'list',
        name: 'testFramework',
        message: message.testFramework,
        choices: [
          {
            name: "Jasmine",
            value: "jasmine"
          },
          {
            name: "Mocha",
            value: "mocha"
          }
        ],
        default: 0
      }];

      this.prompt(prompts, function (props) {
        this.props = extend(this.props, props);
        done();
      }.bind(this));
    },

    askForGithubAccount: function () {
      if (this.options.githubAccount) {
        this.props.githubAccount = this.options.githubAccount;
      } else {
        if (this.props.authorEmail) {
          var done = this.async();

          githubUsername(this.props.authorEmail, function (err, username) {
            if (err) {
              username = username || '';
            }
            this.prompt({
              name: 'githubAccount',
              message: message.githubAccount,
              default: username
            }, function (prompt) {
              this.props.githubAccount = prompt.githubAccount;
              done();
            }.bind(this));
          }.bind(this));
        }
      }
    }
  },

  writing: function () {
    // Re-read the content at this point because a composed generator might modify it.
    var currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    var pkg = extend({
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      homepage: this.props.homepage,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      files: [
        'lib'
      ],
      main: this.props.styles ? ['lib/index.js', 'lib/' + this.props.name + '.css']: 'lib/index.js',
      keywords: [],
      typings: 'lib/index.d.ts'
    }, currentPkg);

    // Combine the keywords
    if (this.props.keywords) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    if (this.props.browser && this.options.bower && this.props.bower) {
      var bower = {
        name: pkg.name,
        version: '0.0.0',
        description: this.props.description,
        main: this.props.styles ? ['bower/' + this.props.name + '.js', 'bower/' + this.props.name + '.css'] : 'bower/' + this.props.name + '.js',
        dependencies: {},
        devDependencies: {},
        moduleType: [
          'global'
        ],
        keywords: pkg.keywords,
        authors: [ this.props.authorName ],
        license: '',
        ignore: [
          'gulp',
          'lib',
          'node_modules',
          'src',
          'docs',
          'test',
          'coverage',
          'typings',
          '.gulp-scss-cache',
          '.sass-cache',
          '.jsTmp',
          '.cssTmp',
          '.idea',
          '.editorconfig',
          '.gitattributes',
          '.gitignore',
          '.jshintrc',
          '.npmignore',
          '.npmrc',
          '.travis.yml',
          '.bowerrc',
          'gulpfile.js',
          'karma.conf.js',
          'karma-coverage.conf.js',
          'package.json',
          'tsconfig.json',
          'tslint.json',
          'npm-debug.log'
        ]
      };

      this.fs.writeJSON(this.destinationPath('bower.json'), bower);
    }
  },

  default: function () {
    if (this.options.travis) {
      this.composeWith('travis', {}, {
        local: require.resolve('generator-travis/generators/app')
      });
    }

    this.composeWith('typescript-npm-bower:editor-conf', {}, {
      local: require.resolve('../editor-conf')
    });

    this.composeWith('typescript-npm-bower:lint', {}, {
      local: require.resolve('../lint')
    });

    this.composeWith('typescript-npm-bower:npm-conf', {}, {
      local: require.resolve('../npm-conf')
    });

    if (this.props.browser && this.options.bower && this.props.bower) {
      this.composeWith('typescript-npm-bower:bower-conf', {}, {
        local: require.resolve('../bower-conf')
      });
    }

    this.composeWith('typescript-npm-bower:typescript-conf', {
        options: {
          name: _.kebabCase(this.props.name),
          browser: this.props.browser,
          testFramework: this.props.testFramework
        }
      }, {
        local: require.resolve('../typescript-conf')
    });

    if (this.props.browser) {
      this.composeWith('typescript-npm-bower:karma-conf', {
        options: {
          testFramework: this.props.testFramework
        }
      }, {
        local: require.resolve('../karma-conf')
      });
    }

    this.composeWith('typescript-npm-bower:git', {
      options: {
        name: this.props.name,
        githubAccount: this.props.githubAccount
      }
    }, {
      local: require.resolve('../git')
    });

    if (this.options.gulp) {
      this.composeWith('typescript-npm-bower:gulp', {
        options: {
          name: _.kebabCase(this.props.name),
          browser: this.props.browser,
          styles: this.props.styles,
          scss: this.props.scss,
          bower: this.props.bower,
          testFramework: this.props.testFramework
        }
      },  {
        local: require.resolve('../gulp')
      });
    }

    if (this.options.boilerplate) {
      this.composeWith('typescript-npm-bower:boilerplate', {
        options: {
          browser: this.props.browser,
          styles: this.props.styles,
          scss: this.props.scss,
          bower: this.props.bower,
          testFramework: this.props.testFramework
        }
      }, {
        local: require.resolve('../boilerplate')
      });
    }

    if (this.options.license && !this.pkg.license) {
      this.composeWith('typescript-npm-bower:license', {
        options: {
          name: this.props.authorName,
          email: this.props.authorEmail,
          website: this.props.authorUrl
        }
      }, {
        local: require.resolve('generator-license/app')
      });
    }

    if (!this.fs.exists(this.destinationPath('README.md'))) {
      this.composeWith('typescript-npm-bower:readme', {
        options: {
          name: this.props.name,
          description: this.props.description,
          githubAccount: this.props.githubAccount,
          authorName: this.props.authorName,
          browser: this.props.browser,
          styles: this.props.styles,
          scss: this.props.scss,
          bower: this.props.bower,
          testFramework: this.props.testFramework
        }

      }, {
        local: require.resolve('../readme')
      });
    }
  },

  install: function () {
    this.npmInstall();
  },

  end: function () {
    this.log(generateEndText());
  }

});

function generateEndText() {
  return chalk.yellow(
    '\n            --= You have successfully installed everything =--' +
    '\n                          --= Thank You =--' +
    '\n');
}
