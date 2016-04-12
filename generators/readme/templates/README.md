# <%= projectName %> 
> <%= description %>

## Installation

```sh
npm install <%= projectName %> --save
```

## Getting Started

* Run: `npm install typings -g` (If [typings](https://www.npmjs.com/package/typings) is not installed before run this command)
* Run:`npm install gulp -g` to install [Gulp](https://www.npmjs.com/package/gulp) globally
* Follow the Complete Directory Layout to get to know about the project.

### Complete Directory Layout

```
.
<% if(bower){ %>├── /bower/                     # The folder for compiled output for bower component consume<% } %>
├── /coverage/                  # Code coverage for source files of the project
├── /docs/                      # Documentation files for the project
├── /example/                   # The folder contains Html file and example.js file to test the bower component
├── /gulp/                      # The folder contains gulp tasks required to build the project
│   ├── /build.js               # Builds the project from source to output (lib and bower) folder
│   ├── /clean.js               # Contain clean tasks required for the prject
│   ├── /conf.js                # Contains the variables used in other gulp files
│   ├── /copy.js                # Copies .css build output to lib and bower folders.
│   ├── /inject.js              # Injects minified bower component to index.html in example folder
<% if(styles && scss){ %>
|   |── /sass.js                # Builds all the .scss files with lint support
<% } -%>
│   ├── /tests.js               # Run tests and generate coverage reports
│   ├── /tsconfig.js            # Updates tsconfig.json with project sources
│   ├── /tsdocs.js              # Generates documentation for the project
│   └── /watch.js               # Watches all the .ts,.js and .scss files for changes
├── /lib/                       # The folder for compiled output with typings for node module consume
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code(.ts) of the application
│   ├── /sub_srcs               # Contain any sub sources(files or folders)
│   └── /index.ts               # Expose the acceseble properties by outside
<% if(styles && scss){ %>
|── /styles/                    # Styling(.css or .scss) files for the project
<% } -%>
├── /test/                      # Contain tests(.ts) for all the source files
├── /typings/                   # Typings files for specific node modules for the project
<% if(styles && scss){ %>
|── .bowerrc                    # Configuration variables for execution in general(like command-line flags)
<% } -%>
├── .editorconfig               # Define and maintain consistent coding styles between different editors and IDEs
├── .gitignore                  # Contains files to be ignored when pushing to git
├── .jshintrc                   # JShint rules for the project
├── .npmignore                  # Contains files to be ignored when pushing to npm
├── .npmrc                      # NPM config file
├── .version                    # Version
<% if(styles && scss){ %>
|── bower.json                  # Configuring packages that can be used as a dependency of another package
<% } -%>
├── karma.conf.js               # Test runner in .ts format
├── karma-coverage.conf         # Test runner and generate coverage for compiled .js files
├── tsconfig.json               # Contains typescript compiler options
├── tslint.json                 # Lint rules for the project
├── typings.json                # Typings information to generate typings folder
└── package.json                # Holds various metadata relevant to the project
```

## Technologies

Usage          	            | Technology
--------------------------	| --------------------------
Javascript Framework        | Typescript
Unit Testing Framework     	| Jasmine
Unit Test Runner           	| Karma
Coverage Generator         	| Istanbul
Documentation              	| Typedoc
Build Tool                	| Gulp
Code Quality Tools         	| JS Hint,<% if(styles && scss){ %> SCSS Lint,<% } -%> TS Lint
Dependency Registries      	| <% if(bower){ %>Bower, <% } -%>NPM
<% if(styles && scss){ %>CSS Extension           	  | SCSS<% } %>


## How to use

Here is the list of tasks available out of the box and run these via `npm run <task>`
```sh
  typings-install   Install typings to the project
  build             Perform npm <% if(bower){ %>and bower <% } -%>build
  clean-build       Cleans lib directory<% if(bower){ %> and bower directory<% } %>
  test              Runs the Jasmine test specs with PhantomJS
  dev-test          Runs the Jasmine test specs with Chrome
  coverage          Generate coverage reports by running all the tests via karma
  typedoc           Generate API Documentation
  tsconfig-update   Update files section in tsconfig.json using filesGlob entries
  watch             Watches ts source files and runs tslint, jshint <% if(styles && scss){ %>and scss-lint <% } -%>on change
```
## Changelog
Recent changes can be viewed on Github on the [CHANGELOG.md](CHANGELOG.md)

## License

Copyright (c) <%= author.name %>
This source code is licensed under the <%= license %> license.
