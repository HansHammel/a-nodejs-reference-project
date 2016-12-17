/* eslint-env node, mocha */
const sinon = require('sinon');
const chai = require('chai');
const fs = require('fs');
const path = require('path');
const os = require('os');
const request = require('supertest');
const app = require('../../lib/web-server/fullblownexpress.js');
// import should from 'should';
const assert = chai.assert;
const expect = chai.expect;
// chai.should(); //recommanded over
const should = chai.should();

describe('Webserver Test Suite', function () {
  describe('Response html with 200', function () {
    it('should be responded as html', function (done) {
      request(app)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200, done);
    });
  });

  describe('GET /', function () {
    it('should respond with property ok', function (done) {
      request(app)
            .get('/')
            .end(function (err, res) {
              if (err) return done(err);
              should.exist(res);
              should.exist(res.body);
              res.should.have.property('ok', true);
              done();
            });
    });
  });
});
