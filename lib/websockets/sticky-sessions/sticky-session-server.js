// Sticky session balancer based on a cluster module, balanced by IP address

const cluster = require('cluster'); // Only required if you want the worker id
const sticky = require('sticky-session');
const http = require('http');

const HTTP_PORT = 8080;
const HTTP_HOST = '127.0.0.1';

const server = http.createServer(function (req, res) {
  res.end('worker: ' + cluster.worker.id);
});

// manage sessions within a node.js cluster
if (!sticky.listen(server, HTTP_PORT)) {
    // Master code
  server.once('listening', function () {
    console.log('server started on ' + HTTP_PORT + ' port');
  });
} else {
    // Worker code
}

