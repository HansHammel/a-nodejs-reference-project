let express = require('express');
let cluster = require('cluster');
let net = require('net');
let sio = require('socket.io');
let sioRedis = require('socket.io-redis');

const HTTP_PORT = 3000;
const HTTP_HOST = '0.0.0.0';
const REDIS_PORT = 6379;
const REDIS_HOST = '127.0.0.1';

let numProcesses = require('os').cpus().length;

if (cluster.isMaster) {
    // This stores our workers. We need to keep them to be able to reference
    // them based on source IP address. It's also useful for auto-restart,
    // for example.
  let workers = [];

    // Helper function for spawning worker at index 'i'.
  let spawn = function (i) {
    workers[i] = cluster.fork();

        // Optional: Restart worker on exit
    workers[i].on('exit', function (code, signal) {
      console.log('respawning worker', i);
      spawn(i);
    });
  };

    // Spawn workers.
  for (let i = 0; i < numProcesses; i++) {
    spawn(i);
  }

    // Helper function for getting a worker index based on IP address.
    // This is a hot path so it should be really fast. The way it works
    // is by converting the IP address to a number by removing non numeric
    // characters, then compressing it to the number of slots we have.
    //
    // Compared against "real" hashing (from the sticky-session code) and
    // "real" IP number conversion, this function is on par in terms of
    // worker index distribution only much faster.
  let workerIndex = function (ip, len) {
    let s = '';
    let i = 0;
    let _len = ip.length;
    for (; i < _len; i++) {
      if (!isNaN(ip[i])) {
        s += ip[i];
      }
    }

    return Number(s) % len;
  };

    // Create the outside facing server listening on our port.
  let server = net.createServer({pauseOnConnect: true}, function (connection) {
        // We received a connection and need to pass it to the appropriate
        // worker. Get the worker for this connection's source IP and pass
        // it the connection.
    let worker = workers[workerIndex(connection.remoteAddress, numProcesses)];
    worker.send('sticky-session:connection', connection);
  }).listen(HTTP_PORT);
} else {
    // Note we don't use a port here because the master listens on it for us.
  let app = express();

    // Here you might use middleware, attach routes, etc.

    // Don't expose our internal server to the outside.
  let server = app.listen(0, '127.0.0.1');
  let io = sio(server);

    // Tell Socket.IO to use the redis adapter. By default, the redis
    // server is assumed to be on localhost:6379. You don't have to
    // specify them explicitly unless you want to change them.
  io.adapter(sioRedis({host: REDIS_HOST, port: REDIS_PORT}));

    // Here you might use Socket.IO middleware for authorization etc.

    // Listen to messages sent from the master. Ignore everything else.
  process.on('message', function (message, connection) {
    if (message !== 'sticky-session:connection') {
      return;
    }
        // Emulate a connection event on the server by emitting the
        // event with the connection the master sent us.
    server.emit('connection', connection);
    connection.resume();
  });
}
