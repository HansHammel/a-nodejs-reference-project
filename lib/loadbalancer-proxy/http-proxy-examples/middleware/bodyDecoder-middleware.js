/*
  bodyDecoder-middleware.js: Basic example of `connect.bodyParser()` middleware in node-http-proxy

  Copyright (c) 2013 - 2016 Charlie Robbins, Jarrett Cruger & the Contributors.

  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

const http = require('http');
const connect = require('connect');
const request = require('request');
let colors = require('colors');
let util = require('util');
const bodyParser = require('body-parser');
const httpProxy = require('http-proxy');
let proxy = httpProxy.createProxyServer({});

// restream parsed body before proxying
proxy.on('proxyReq', function (proxyReq, req, res, options) {
  if (req.body) {
    let bodyData = JSON.stringify(req.body);
    // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
    proxyReq.setHeader('Content-Type', 'application/json');
    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
    // stream the content
    proxyReq.write(bodyData);
  }
});

//
//  Basic Http Proxy Server
//
const app = connect()
    .use(bodyParser.json())// json parser
    .use(bodyParser.urlencoded())// urlencoded parser
    .use(function (req, res) {
        // modify body here,
        // eg: req.body = {a: 1}.
      console.log('proxy body:', req.body);
      proxy.web(req, res, {
        target: 'http://127.0.0.1:9013'
      });
    });

http.createServer(app).listen(8013, function () {
  console.log('proxy linsten 8013');
});

//
//  Target Http Server
//
const app1 = connect()
    .use(bodyParser.json())
    .use(function (req, res) {
      console.log('app1:', req.body);
      res.end('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
    });
http.createServer(app1).listen(9013, function () {
  // request to 8013 to proxy
  request.post({//
    url: 'http://127.0.0.1:8013',
    json: {content: 123, type: 'greeting from json request'}
  }, function (err, res, data) {
    console.log('return for json request:', err, data);
  });

  // application/x-www-form-urlencoded request
  request.post({//
    url: 'http://127.0.0.1:8013',
    form: {content: 123, type: 'greeting from urlencoded request'}
  }, function (err, res, data) {
    console.log('return for urlencoded request:', err, data);
  });
});

