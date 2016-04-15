'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');
var fs = require('fs');

describe('generator-npm-bower-module:typescript-conf', function () {
  describe('default scenario', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/typescript-conf'))
            .on('end', done);
    });

    it('creates tsconfig.json file with correct content', function (done) {
      fs.readFile(path.join(__dirname, 'templates/tsconfig-template.json'), 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          done(err);
        }

        assert.fileContent([
          ['tsconfig.json', data]
        ]);

        done();
      });
    });

    it('creates typings.json file with correct content', function (done) {
      fs.readFile(path.join(__dirname, 'templates/typings-template-default.json'), 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          done(err);
        }

        assert.fileContent([
          ['typings.json', data]
        ]);

        done();
      });
    });
  });

  describe('browser true mocha scenario', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../../generators/typescript-conf'))
        .withOptions({
          name: 'my-project-1',
          browser: true,
          testFramework: 'mocha'
        })
        .on('end', done);
    });

    it('creates tsconfig.json file with correct content', function (done) {
      fs.readFile(path.join(__dirname, 'templates/tsconfig-template.json'), 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          done(err);
        }

        assert.fileContent([
          ['tsconfig.json', data]
        ]);

        done();
      });
    });

    it('creates typings.json file with correct content', function (done) {
      fs.readFile(path.join(__dirname, 'templates/typings-template-1.json'), 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          done(err);
        }

        assert.fileContent([
          ['typings.json', data]
        ]);

        done();
      });
    });
  });

  describe('browser true jasmine scenario', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../../generators/typescript-conf'))
        .withOptions({
          name: 'my-project',
          browser: true,
          testFramework: 'jasmine'
        })
        .on('end', done);
    });

    it('creates tsconfig.json file with correct content', function (done) {
      fs.readFile(path.join(__dirname, 'templates/tsconfig-template.json'), 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          done(err);
        }

        assert.fileContent([
          ['tsconfig.json', data]
        ]);

        done();
      });
    });

    it('creates typings.json file with correct content', function (done) {
      fs.readFile(path.join(__dirname, 'templates/typings-template-2.json'), 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          done(err);
        }

        assert.fileContent([
          ['typings.json', data]
        ]);

        done();
      });
    });
  });

  describe('browser false scenario', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../../generators/typescript-conf'))
        .withOptions({
          name: 'my-project-1',
          browser: false
        })
        .on('end', done);
    });

    it('creates tsconfig.json file with correct content', function (done) {
      fs.readFile(path.join(__dirname, 'templates/tsconfig-template.json'), 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          done(err);
        }

        assert.fileContent([
          ['tsconfig.json', data]
        ]);

        done();
      });
    });

    it('creates typings.json file with correct content', function (done) {
      fs.readFile(path.join(__dirname, 'templates/typings-template-1.json'), 'utf8', function (err, data) {
        if (err) {
          console.log(err);
          done(err);
        }

        assert.fileContent([
          ['typings.json', data]
        ]);

        done();
      });
    });
  });
});
