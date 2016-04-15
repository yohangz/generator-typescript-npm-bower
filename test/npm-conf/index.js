'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

describe('generator-npm-bower-module:npm-conf', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../../generators/npm-conf'))
      .on('end', done);
  });

  it('creates .npmignore file with correct content', function (done) {
    fs.readFile(path.join(__dirname, 'templates/npmignore-template'), 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        done(err);
      }

      assert.fileContent([
        ['.npmignore', data]
      ]);

      done();
    });
  });

  it('creates .npmrc file with correct content', function (done) {
    fs.readFile(path.join(__dirname, 'templates/npmrc-template'), 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        done(err);
      }

      assert.fileContent([
        ['.npmrc', data]
      ]);

      done();
    });
  });
});
