# Change Log

## [1.0.0] - 2016-04-13

### Added
> Initial project structure.

### Features
- Automatic documentation generation.
- Karma/Jasmine testing environment support.
- Code Coverage with istanbul.
- Build process with Gulp.
- Lint support with
  - [JS Hint](http://jshint.com/)
  - [TS Lint](https://www.npmjs.com/package/tslint)
<% if(styles && scss){ -%>
  - [SCSS Lint](https://www.npmjs.com/package/gulp-scss-lint)
<% } else if(styles && !scss){ -%>
  - [CSS Lint](https://www.npmjs.com/package/gulp-csslint) 
<% } -%>  
 
## [Unreleased]
### Added
- Test the node module independently with the support of mocha and chai.
