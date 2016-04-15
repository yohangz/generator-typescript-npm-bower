'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

describe('generator-npm-bower-module:bower-conf', function () {
  before(function (done) {
      helpers.run(path.join(__dirname, '../../generators/bower-conf'))
          .on('end', done);
  });

  it('creates .bowerrc file with correct content', function (done) {
    fs.readFile(path.join(__dirname, 'templates/bowerrc-template'), 'utf8', function (err, data) {
      if (err) {
        console.log(err);
        done(err);
      }

      assert.fileContent([
        ['.bowerrc', data]
      ]);

      done();
    });
  });
});
