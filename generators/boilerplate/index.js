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

  writing: function() {

    if (this.options.bower) {
      this.fs.copy(
        this.templatePath('example/**/*'),
        this.destinationPath(this.options.generateInto, 'example')
      );
    }

    this.fs.copyTpl(
      this.templatePath('src/**/*.ts'),
      this.destinationPath(this.options.generateInto, 'src'),
      {
        bower: this.options.bower
      }
    );

    this.fs.copy(
      this.templatePath('test/**/*.ts'),
      this.destinationPath(this.options.generateInto, 'test')
    );

    if (this.options.styles) {
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
