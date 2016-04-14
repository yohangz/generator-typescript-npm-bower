'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-npm-bower-module:bower-conf', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/bower-conf'))
            .on('end', done);
    });

    it('creates .bowerrc file', function () {
        assert.file([
            '.bowerrc'
        ]);
    });
});
