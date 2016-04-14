'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-npm-bower-module:npm-conf', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/npm-conf'))
      .on('end', done);
  });

  it('creates .npmignore and .npmrc files', function () {
    assert.file([
            '.npmignore',
            '.npmrc'
        ]);
  });
});
