/* eslint-env node, mocha */

let expect = require('chai').expect;
// var app = require('../index.js');
let fs = require('fs');
let path = require('path');
let os = require('os');

describe('Mocha Test Suite', function () {
  before(function () {
        // silence the console
    console._log = console.log;
    console.log = function () { };
  });
  after(function () {
        // restore console
        /* eslint-disable */
        console.log = console_log;
        delete console._log;
        /* eslint-enable */
  });
  it('should not generate output to console', function (done) {
    console.log('muted');
    done();
  });
  it('should be perfect', function (done) {
    done();
  });
});
