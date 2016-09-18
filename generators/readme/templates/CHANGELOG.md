# Change Log

## [Unreleased]

### Added

*Use this section to add the details of your unreleased version*

## [0.0.2] - <%= date %>

### Added
> Feature updates.

### Features

## [0.0.1] - <%= date %>

### Added
> Initial project structure.

### Features
- Automatic documentation generation.
<% if (bower) { -%>
- Karma test runner.
<% } -%>
<% if (testFramework === 'mocha') { -%>
- Mocha and Chai
<% } else if (testFramework === 'jasmine') { -%>
- Jasmine
<% } -%> testing tool support.
- Code Coverage with istanbul.
- Build process with Gulp.
- Debugging your sources with sourcemaps.
- Typescript Based node module <% if (bower) { -%>and bower component <% } -%>output.
- Automatic generation of CHANAGELOG.md and PULL_REQUEST_TEMPLATE.md.
- Automatic table of content generation with [doctoc](https://github.com/thlorenz/doctoc).
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
