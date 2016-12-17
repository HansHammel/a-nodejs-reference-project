/* eslint-env node, mocha */
const sinon = require('sinon');
const chai = require('chai');
const fs = require('fs');
const path = require('path');
const os = require('os');
const request = require('supertest');
// const should  = require('should');
const assert = chai.assert;
const expect = chai.expect;
chai.should();

describe('Mocha Test Suite', function () {
  before(function (done) {
      done();
  });
  after(function (done) {
      done();
  });

  it('should not generate output to console', function (done) {
    done();
  });
  it('should be perfect', function (done) {
    done();
  });
});

