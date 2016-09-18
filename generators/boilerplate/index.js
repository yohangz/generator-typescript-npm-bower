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

    this.option('fonts', {
      type: Boolean,
      required: false,
      defaults: true,
      desc: message.fonts
    });

    this.option('bower', {
      type: Boolean,
      required: true,
      defaults: true,
      desc: message.bower
    });

    this.option('testFramework', {
      type: String,
      required: true,
      defaults: 'jasmine',
      desc: message.testFramework
    });
  },

  writing: function () {
    if (this.options.bower) {
      this.fs.copyTpl(
        this.templatePath('example/**/*'),
        this.destinationPath(this.options.generateInto, 'example'),
        {
          styles: this.options.bower && this.options.styles
        }
      );
    }

    this.fs.copyTpl(
      this.templatePath('src/**/*.ts'),
      this.destinationPath(this.options.generateInto, 'src'),
      {
        bower: this.options.bower
      }
    );

    this.fs.copyTpl(
      this.templatePath('test/**/*.ts'),
      this.destinationPath(this.options.generateInto, 'test'),
      {
        testFramework: this.options.testFramework
      }
    );

    if (this.options.bower && this.options.styles) {

      if (this.options.fonts) {
        this.fs.copy(
          this.templatePath('styles/fonts/*.{eot,otf,svg,ttf,woff,woff2}'),
          this.destinationPath(this.options.generateInto, 'styles/fonts')
        );
      }

      if (this.options.scss) {
        this.fs.copy(
          this.templatePath('styles/**/*.scss'),
          this.destinationPath(this.options.generateInto, 'styles')
        );
      } else {
        this.fs.copy(
          this.templatePath('styles/**/*.css'),
          this.destinationPath(this.options.generateInto, 'styles')
        );
      }
    }
  }
});
