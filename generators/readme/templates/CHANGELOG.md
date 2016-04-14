# Change Log

## [Unreleased]

### Added

- [SASS](http://sass-lang.com/) support.
- [LESS](http://lesscss.org/usage/) support.
- [QUnit](https://qunitjs.com/) support.
- Complete unit test coverage.

## [0.0.1] - <%= date %>

### Added
> Initial project structure.

### Features
- Automatic documentation generation.
<% if (browser && (testFramework === 'mocha')) { -%>
- Karma, Mocha and Chai
<% } else if (browser && (testFramework === 'jasmine')) { -%>
- Karma and Jasmine
<% } else if(!browser) { -%> 
- Mocha and Chai
<% } -%> testing environment support.
- Code Coverage with istanbul.
- Build process with Gulp.
- Typescript Based node module <% if (bower) { -%>and bower component <% } -%>output.
- Lint support with
  - [JSHint](http://jshint.com/)
  - [TSLint](https://www.npmjs.com/package/tslint)
<% if (styles) { if (scss) { -%>
  - [SCSS Lint](https://www.npmjs.com/package/gulp-scss-lint)
<% } else { -%>
  - [CSS Lint](https://www.npmjs.com/package/gulp-csslint) 
<% }} -%>  

