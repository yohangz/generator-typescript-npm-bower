'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-npm-bower-module:editor-conf', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../generators/editor-conf'))
            .on('end', done);
    });

    it('creates .editorconfig file', function () {
        assert.file([
            '.editorconfig'
        ]);
    });
});
