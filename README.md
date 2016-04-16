# Generator Typescript NPM Bower 
[![MIT License][license-image]][license-url] [![NPM version][npm-image]][npm-url]  [![Build Status][travis-image]][travis-url]
> Yeoman generator for creating TypeScript Node module (Client/Server) and Bower component (NPM, Bower, TypeScript, Gulp, Jasmine, Mocha, Karma, Istanbul, Typedoc, JS Hint, TS Hint, SASS Lint, CSS Lint, SASS, Travis CI) - lets you quickly set up a project following best practices.

![Yo dawg, I heard you like typescript](https://cdn.meme.am/instances/500x/57868268.jpg)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-typescript-npm-bower using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/) v4 or higher).

```bash
npm install -g yo
npm install -g generator-typescript-npm-bower
```

Then generate your new project:

```bash
yo typescript-npm-bower
```

## Complete Directory Layout

```
.
├── /bower/                     # The folder for compiled output for bower component consume
├── /coverage/                  # Code coverage for source files of the project
├── /docs/                      # Documentation files for the project
├── /example/                   # The folder contains Html file and example.js file to test the bower component
├── /gulp/                      # The folder contains gulp tasks required to build the project
│   ├── /build.js               # Builds the project from source to output and bower folder
│   ├── /clean.js               # Contain clean tasks required for the prject
│   ├── /conf.js                # Contains the variables used in other gulp files
│   ├── /css.js                 # Concat and minify .css files in styles folder with css lint support
│   ├── /copy.js                # Copies .css build output to lib and bower folders
│   ├── /inject.js              # Injects minified js file and css file to index.html in example folder
│   ├── /lint.js                # Common lint support with jshint and tslint
|   |── /scss.js                # Builds all the .scss or .sass files with sass lint support
│   ├── /scripts.js             # Build scripts
│   ├── /tests.js               # Run tests and generate coverage reports
│   ├── /tsconfig.js            # Updates tsconfig.json with project sources
│   ├── /tsdocs.js              # Generates documentation for the project
│   ├── /version.js             # Updated version
│   └── /watch.js               # Watches all the .ts, .js, .scss or .sass and .css files for changes
├── /lib/                       # The folder for compiled output with typings for node module consume
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code(.ts) of the application
│   ├── /sub_srcs               # Contain any sub sources(files or folders)
│   └── /index.ts               # Expose the acceseble properties by outside
|── /styles/                    # Styling .scss or .sass and .css files for the project
├── /test/                      # Contain tests(.ts) for all the source files
├── /typings/                   # Typings files for specific node modules for the project
|── .bowerrc                    # Configuration variables for execution in general(like command-line flags)
├── .editorconfig               # Define and maintain consistent coding styles between different editors and IDEs
├── .gitattributes              # Defining attributes per path
├── .gitignore                  # Contains files to be ignored when pushing to git
├── .jshintrc                   # JShint rules for the project
├── .npmignore                  # Contains files to be ignored when pushing to npm
├── .npmrc                      # NPM config file
├── .travis.yml                 # Travis CI configuration file
|── bower.json                  # Configuring packages that can be used as a dependency of another package
├── CHANGELOG.md                # Detailed recent changes in the versions
├── gulpfile.js                 # Link all splittered gulp tasks  
├── karma.conf.js               # Test runner in .ts format
├── karma-coverage.conf         # Test runner and generate coverage for compiled .js files
├── LICENSE                     # Contains License Agreement file
├── package.json                # Holds various metadata relevant to the project
├── README.md                   # Contains the details of the generated project
├── tsconfig.json               # Contains typescript compiler options
├── tslint.json                 # Lint rules for the project
└── typings.json                # Typings information to generate typings folder
```

## Usage

```
yo generator-typescript-npm-bower
```

*Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files.*

That'll generate a project with all the common tools setup. This includes:

- Filled `package.json` file
- [Gulp](http://gulpjs.com/) task runner
- [Typescript](https://www.typescriptlang.org/) javascript transpiler
- [Jasmine](http://jasmine.github.io/2.0/introduction.html), [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/) unit testing
- [Karma](https://karma-runner.github.io/0.13/index.html) test runner
- [TSLint](https://www.npmjs.com/package/tslint), [JShint](http://jshint.com/), [CSS Lint](https://www.npmjs.com/package/gulp-csslint) and [SASS Lint](https://www.npmjs.com/package/sass-lint) linting and code style checking
- [SASS](http://sass-lang.com/) CSS extension
- [Browserify](http://browserify.org/) bring browser compatibility
- [Istanbul](https://gotwarlost.github.io/istanbul/) code coverage
- [Typedoc](http://typedoc.io/) documentation generator
- [Travis CI](https://travis-ci.org/) continuous integration
- [License](https://spdx.org/licenses/)

### Running tests

You can use gulp to run test:

```
npm -g install gulp
npm test
```

### Publishing your code

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

## Extend this generator

First of all, make sure you're comfortable with [Yeoman composability](http://yeoman.io/authoring/composability.html) feature. Then in your own generator:

```js
module.exports = generators.Base.extend({
  default: function () {
    this.composeWith('generator-typescript-npm-bower:app', {
      options: {/* provide the options you want */}
    }, {
      local: require.resolve('generator-typescript-npm-bower/generators/app')
    });
  }
});
```

### Options

Here's a list of our supported options:

- `name` (String, default current working directory) set project name
- `boilerplate` (Boolean, default true) include or not the boilerplate files (`src`, `example`, `test` and `styles`).
- `editorconfig` (Boolean, default true) include or not a `.editorconfig` file.
- `git` (Boolean, default true) include or not the git files (`.gitattributes`, `.gitignore`).
- `gulp` (Boolean, default true) include or not a `gulpfile.js`.
- `styles` (Boolean, default false) include CSS.
- `scss` (Boolean, default true) include SASS extension.
- `bower` (Boolean, default true)  include bower component files.
- `license` (Boolean, default true) include or not a `LICENSE` file.
- `travis` (Boolean, default true) include or not a `.travis.yml` file.
- `githubAccount` (String) Account name for GitHub repo location.
- `readme` (String) content of the `README.md` file. Given this option, generator-typescript-npm-bower will generate license section.

### Sub generators

If you don't need all the features provided by the main generator, you can still use a limited set of features by composing with our sub generators directly.

Remember you can see the options of each sub generators by running `yo typescript-npm-bower:sub --help`.

- `typescript-npm-bower:boilerplate`
- `typescript-npm-bower:bower-conf`
- `typescript-npm-bower:editor-conf`
- `typescript-npm-bower:git`
- `typescript-npm-bower:gulp`
- `typescript-npm-bower:karma-conf`
- `typescript-npm-bower:lint`
- `typescript-npm-bower:npm-conf`
- `typescript-npm-bower:readme`
- `typescript-npm-bower:typescript-conf`

# Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## Issues

- SASS Lint is not fully supported in windows platform. Please make sure to remove the `watch-scss-scripts` task form watch sequence if errors occur.
- Documentation generation task will emit console errors for external module references but documentation will be generated properly.

## Changelog
Recent changes can be viewed on Github on the [CHANGELOG.md](https://github.com/yohangz/generator-typescript-npm-bower/blob/master/CHANGELOG.md)

## License

MIT © [Yohan Gomez](https://github.com/yohangz), [Lahiru Sampath](https://github.com/lahiruz)

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat 
[license-url]: https://github.com/yohangz/generator-typescript-npm-bower/blob/master/LICENSE
[npm-image]: https://badge.fury.io/js/generator-typescript-npm-bower.svg
[npm-url]: https://www.npmjs.com/package/generator-typescript-npm-bower
[travis-url]: https://travis-ci.org/yohangz/generator-typescript-npm-bower
[travis-image]: https://travis-ci.org/yohangz/generator-typescript-npm-bower.svg?branch=master
