/*
  custom-proxy-error.js: Example of using the custom `proxyError` event.

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
let http = require('http');
const httpProxy = require('http-proxy');

//
// Http Proxy Server with bad target
//
const proxy = httpProxy.createServer({
  target: 'http://localhost:9005'
});

//
// Tell the proxy to listen on port 8000
//
proxy.listen(8005);

//
// Listen for the `error` event on `proxy`.
proxy.on('error', (err, req, res) => {
  if (err) { console.error(err); }
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end('Something went wrong. And we are reporting a custom error message.');
});

util.puts('http proxy server '.blue + 'started '.green.bold + 'on port '.blue + '8005 '.yellow + 'with custom error message'.magenta.underline);
