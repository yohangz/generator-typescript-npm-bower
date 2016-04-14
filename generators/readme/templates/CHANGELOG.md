# Change Log

## [0.0.1] - <%= date %>

### Added
> Initial project structure.

### Features
- Automatic documentation generation.
- Karma/Jasmine testing environment support.
- Code Coverage with istanbul.
- Build process with Gulp.
- Lint support with
  - [JSHint](http://jshint.com/)
  - [TSLint](https://www.npmjs.com/package/tslint)
<% if(styles && scss){ -%>
  - [SCSS Lint](https://www.npmjs.com/package/gulp-scss-lint)
<% } else if(styles && !scss){ -%>
  - [CSS Lint](https://www.npmjs.com/package/gulp-csslint) 
<% } -%>  
