# Change Log

## [Unreleased]

### Added

- [LESS](http://lesscss.org/usage/) support.
- [QUnit](https://qunitjs.com/) support.
- Complete unit test coverage.

## [0.0.1] - <%= date %>

### Added
> Initial project structure.

### Features
- Automatic documentation generation.
<% if (browser) { -%>
- Karma test runner.
<% } -%>
<% if (testFramework === 'mocha') { -%>
- Mocha and Chai
<% } else if (testFramework === 'jasmine') { -%>
- Jasmine
<% } -%> testing tool support.
- Code Coverage with istanbul.
- Build process with Gulp.
- Typescript Based node module <% if (bower) { -%>and bower component <% } -%>output.
- Lint support with
  - [JSHint](http://jshint.com/)
  - [TSLint](https://www.npmjs.com/package/tslint)
<% if (styles) { if (scss) { -%>
  - [SASS Lint](https://www.npmjs.com/package/sass-lint)
<% } else { -%>
  - [CSS Lint](https://www.npmjs.com/package/gulp-csslint) 
<% }} -%>  

---
*To maintain a proper CHANGELOG.md read [Keep a CHANGELOG](http://keepachangelog.com/)*
