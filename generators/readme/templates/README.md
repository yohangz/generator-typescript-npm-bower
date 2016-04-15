# <%= projectName %> 
> <%= description %>

## Installation

```
npm install <%= projectName %> --save
```

## Getting Started

* Run: `npm install typings -g` (If [typings](https://www.npmjs.com/package/typings) is not installed before run this command)
* Run:`npm install gulp -g` to install [Gulp](https://www.npmjs.com/package/gulp) globally
* Follow the Complete Directory Layout to get to know about the project.

### Complete Directory Layout

```
.
<% if(bower){ -%>
├── /bower/                     # The folder for compiled output for bower component consume
<% } -%>
├── /coverage/                  # Code coverage for source files of the project
├── /docs/                      # Documentation files for the project
<% if(bower){ -%>
├── /example/                   # The folder contains Html file and example.js file to test the bower component
<% } -%>
├── /gulp/                      # The folder contains gulp tasks required to build the project
│   ├── /build.js               # Builds the project from source to output(lib<% if(bower){ %> and bower<% } %>) folder
│   ├── /clean.js               # Contain clean tasks required for the prject
│   ├── /conf.js                # Contains the variables used in other gulp files
<% if(styles && !scss){ -%>
│   ├── /css.js                 # Minify .css files in styles folder with lint support.
<% } -%>
<% if(styles){ -%>
│   ├── /copy.js                # Copies .css build output to lib and bower folders.
<% } -%>
<% if(bower || styles){ -%>
│   ├── /inject.js              # Injects minified js file <% if(styles){ %>and css file<% } %> to index.html in example folder
<% } -%>
│   ├── /lint.js                # Common lint support with jshint and tslint
<% if(styles && scss){ -%>
|   |── /scss.js                # Builds all the .scss files with scss lint support
<% } -%>
│   ├── /scripts.js             # Build scripts
│   ├── /tests.js               # Run tests and generate coverage reports
│   ├── /tsconfig.js            # Updates tsconfig.json with project sources
│   ├── /tsdocs.js              # Generates documentation for the project
│   ├── /version.js             # Updated version
│   └── /watch.js               # Watches all the .ts,.js <% if(styles){ if(scss){ %>and .scss <% } else { -%>and .css <% }} -%>files for changes
├── /lib/                       # The folder for compiled output with typings for node module consume
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code(.ts) of the application
│   ├── /sub_srcs               # Contain any sub sources(files or folders)
│   └── /index.ts               # Expose the acceseble properties by outside
<% if(styles){ -%>
|── /styles/                    # Styling <% if(scss){ -%>.scss<% } else { -%>.css<% } -%> files for the project
<% } -%>
├── /test/                      # Contain tests(.ts) for all the source files
├── /typings/                   # Typings files for specific node modules for the project
<% if(bower){ -%>
|── .bowerrc                    # Configuration variables for execution in general(like command-line flags)
<% } -%>
├── .editorconfig               # Define and maintain consistent coding styles between different editors and IDEs
├── .gitattributes              # Defining attributes per path
├── .gitignore                  # Contains files to be ignored when pushing to git
├── .jshintrc                   # JShint rules for the project
├── .npmignore                  # Contains files to be ignored when pushing to npm
├── .npmrc                      # NPM config file
├── .travis.yml                 # Travis CI configuration file
<% if(bower){ -%>
|── bower.json                  # Configuring packages that can be used as a dependency of another package
<% } -%>
├── CHANGELOG.md                # Detailed recent changes in the versions
├── gulpfile.js                 # Link all splittered gulp tasks  
<% if(browser){ -%>
├── karma.conf.js               # Test runner in .ts format
├── karma-coverage.conf         # Test runner and generate coverage for compiled .js files
<% } -%>
├── LICENSE                     # Contains License Agreement file
├── package.json                # Holds various metadata relevant to the project
├── README.md                   # Contains the details of the generated project
├── tsconfig.json               # Contains typescript compiler options
├── tslint.json                 # Lint rules for the project
└── typings.json                # Typings information to generate typings folder
```

## Technologies

Usage          	            | Technology
--------------------------	| --------------------------
Javascript Framework        | Typescript
Unit Testing Framework     	| <% if (browser && (testFramework === 'jasmine')) { -%>Jasmine<% } else { -%>Mocha and Chai<% } %>
Unit Test Runner           	| Karma
Coverage Generator         	| Istanbul
Documentation              	| Typedoc
Build Tool                	| Gulp
Code Quality Tools         	| JS Hint,<% if(styles) { if(scss){ -%> SCSS Lint,<% } else { -%> CSS Lint,<% }} -%> TS Lint
Dependency Registries      	| <% if(bower){ %>Bower, <% } -%>NPM
<% if(styles){ -%>
Styling Tool            	  | <% if(scss){ -%>SCSS<% } else { -%>CSS<% } -%>
<% } -%>

## How to use

Here is the list of tasks available out of the box and run these via `npm run <task>`
```
  typings-install   Install typings to the project
  build             Perform npm <% if(bower){ %>and bower <% } -%>build
  clean             Cleans lib directory<% if(bower){ %> and bower directory<% } %>
  test              Run spec tests
<% if(browser){ -%>
  dev-test          Runs the test specs with Chrome
<% } -%>
  coverage          Generate coverage reports by running all the tests via karma
  doc               Generate API Documentation
  tsconfig-update   Update files section in tsconfig.json using filesGlob entries
  watch             Watches ts source files and runs tslint, jshint <% if(styles && scss){ -%>and scss-lint <% } else if(styles && !scss){ -%>and csslint <% } -%>on change
  patch             Update patch version and create tag
  feature           Update feature version and create tag
  release           Update release version and create tag
```

## Publishing your code

*Once your tests are passing (ideally with a Travis CI green run), you might be ready to publish your code to npm.*

Bumping version number and tagging the repository with it can be done as mentioned below.
For more details read [http://semver.org/](http://semver.org/)
 
Available options to update version 
```  
npm run patch     # makes v0.1.0 → v0.1.1
npm run feature   # makes v0.1.1 → v0.2.0
npm run release   # makes v0.2.1 → v1.0.0
```
Publishing updated version can be done via,
```
npm run <release | feature | patch>
npm publish
```

# Changelog
Recent changes can be viewed on the [CHANGELOG.md](CHANGELOG.md)

## License

Copyright (c) <%= author.name %>
This source code is licensed under the <%= license %> license.
