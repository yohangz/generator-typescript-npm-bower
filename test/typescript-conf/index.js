'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-npm-bower-module:typescript-conf', function () {
    before(function (done) {
        helpers.run(path.join(__dirname, '../../generators/typescript-conf'))
            .on('end', done);
    });

    it('creates tsconfig.json and typings.json files', function () {
        assert.file([
            'tsconfig.json',
            'typings.json'
        ]);
    });
});
