# Generator Typescript NPM Bower 
[![MIT License][license-image]][license-url] [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]
> Generate NPM module/ Bower Bower component.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-typescript-npm-bower using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-typescript-npm-bower
```

Then generate your new project:

```bash
yo typescript-npm-bower
```

## Usage

```
yo generator-typescript-npm-bower
```

*Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files.*

That'll generate a project with all the common tools setup. This includes:

- Filled `package.json` file
- [gulp](http://gulpjs.com/) task runner
- [Typescript](https://www.typescriptlang.org/) javascript transpiler
- [Jasmine](http://jasmine.github.io/2.0/introduction.html) unit test
- [Karma](https://karma-runner.github.io/0.13/index.html) test runner
- [TSLint](https://www.npmjs.com/package/tslint), [JShint](http://jshint.com/), [CSS Lint](https://www.npmjs.com/package/gulp-csslint)  and [SCSS Lint](https://www.npmjs.com/package/sass-lint) linting and code style checking
- [Istanbul](https://gotwarlost.github.io/istanbul/) code coverage
- [Typedoc](http://typedoc.io/) documentation generator
- [Travis CI](https://travis-ci.org/) continuous integration (optional)
- [License](https://spdx.org/licenses/)

### Running tests

Once the project is scaffolded, inside the project folder run:

```
npm test
```

You can also directly use mocha to run test on single files:

```
 npm -g install mocha
 mocha test/name.js
```

### Publishing your code

Once your tests are passing (ideally with a Travis CI green run), you might be ready to publish your code to npm. We recommend you using [npm version](https://docs.npmjs.com/cli/version) to tag release correctly.

```
$ npm version major
$ git push --follow-tags
# ATTENTION: There is no turning back here.
$ npm publish
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
- `scss` (Boolean, default true) include SCSS extension.
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

## Changelog
Recent changes can be viewed on Github on the [CHANGELOG.md](CHANGELOG.md)

## License

MIT © [Yohan Gomez](https://github.com/yohangz), [Lahiru Sampath](https://github.com/lahiruz)

[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat 
[license-url]: https://github.com/yohangz/generator-typescript-npm-bower/blob/master/LICENSE
[npm-image]: https://badge.fury.io/js/generator-npm-bower-module.svg
[npm-url]: https://www.npmjs.com/package/generator-typescript-npm-bower
[travis-url]: https://travis-ci.org/yohangz/generator-typescript-npm-bower
[travis-image]: https://secure.travis-ci.org/asbjornenge/generator-microlib.png?branch=master
