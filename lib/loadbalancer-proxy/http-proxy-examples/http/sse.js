/*
  sse.js: Basic example of proxying over HTTP

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

const util = require('util');
let colors = require('colors');
const http = require('http');
const httpProxy = require('http-proxy');
const SSE = require('sse');

//
// Basic Http Proxy Server
//
// removed new !!!
const proxy = httpProxy.createProxyServer();
http.createServer(function (req, res) {
  proxy.web(req, res, {
    target: 'http://localhost:9003'
  });
}).listen(8003);

//
// Target Http Server
//
const server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
});

//
// Use SSE
//

const sse = new SSE(server, {path: '/'});
sse.on('connection', function (client) {
  let count = 0;
  setInterval(function () {
    client.send('message #' + count++);
  }, 1500);
});

server.listen(9003);

util.puts('http proxy server'.blue + ' started '.green.bold + 'on port '.blue + '8003'.yellow);
util.puts('http server '.blue + 'started '.green.bold + 'on port '.blue + '9003 '.yellow);
