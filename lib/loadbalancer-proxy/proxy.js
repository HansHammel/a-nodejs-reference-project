// include dependencies
const express = require('express');
const proxy = require('http-proxy-middleware');

// proxy middleware options
// more option https://github.com/chimurai/http-proxy-middleware
const options = {
  target: 'http://www.example.org', // target host
  changeOrigin: true,               // needed for virtual hosted sites
  ws: true,                         // proxy websockets
  pathRewrite: {
    '^/api/old-path': '/api/new-path',     // rewrite path
    '^/api/remove/path': '/path'           // remove base path
  },
    // when request.headers.host == 'dev.localhost:3000',
    // override target 'http://www.example.org' to 'http://localhost:8000'
  router: {
    'integration.localhost:3000': 'http://localhost:8001',  // host only
    'staging.localhost:3000': 'http://localhost:8002',  // host only
    'localhost:3000/api': 'http://localhost:8003',  // host + path
    '/rest': 'http://localhost:8004'   // path only

  },
  logLevel: 'info'// 'debug', 'info', 'warn', 'error', 'silent'
};

// create the proxy (without context)
const exampleProxy = proxy(options);

// mount `exampleProxy` in web server
const app = express();
app.use('/api', exampleProxy);
app.listen(3000);
