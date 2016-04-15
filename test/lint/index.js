'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

describe('generator-npm-bower-module:lint', function () {
  before(function (done) {
      helpers.run(path.join(__dirname, '../../generators/lint'))
          .on('end', done);
  });

  it('creates .jshintrc file with correct content', function (done) {
    fs.readFile(path.join(__dirname, 'templates/jshintrc-template'), 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        done(err);
      }

      assert.fileContent([
        ['.jshintrc', data]
      ]);

      done();
    });
  });

  it('creates tslint.json file with correct content', function (done) {
    fs.readFile(path.join(__dirname, 'templates/tslint-template.json'), 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        done(err);
      }

      assert.fileContent([
        ['tslint.json', data]
      ]);

      done();
    });
  });
});
