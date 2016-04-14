'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-npm-bower-module:lint', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/lint'))
            .on('end', done);
    });

    it('creates .jshintrc and tslint.json files', function () {
        assert.file([
            '.jshintrc',
            'tslint.json'
        ]);
    });
});
