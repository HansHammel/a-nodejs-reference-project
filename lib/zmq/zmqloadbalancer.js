const cluster = require('cluster');
const zmq = require('zmq');
const backAddr = 'tcp://127.0.0.1:12345';
const frontAddr = 'tcp://127.0.0.1:12346';
const clients = 10;
const workers = 3;

function clientProcess () {
  const sock = zmq.socket('req');
  sock.identity = 'client' + process.pid;
  sock.connect(frontAddr);
  sock.send('HELLO');

  sock.on('message', function (data) {
    console.log(sock.identity + " <- '" + data + "'");
    sock.close();
    cluster.worker.kill();
  });
}

function workerProcess () {
  const sock = zmq.socket('req');
  sock.identity = 'worker' + process.pid;
  sock.connect(backAddr);
  sock.send('READY');

  sock.on('message', function () {
    const args = Array.apply(null, arguments);
    console.log("'" + args + "' -> " + sock.identity);
    sock.send([arguments[0], '', 'OK']);
  });
}

function loadBalancer () {
  const workers = []; // list of available worker id's

  const backSvr = zmq.socket('router');
  backSvr.identity = 'backSvr' + process.pid;
  backSvr.bind(backAddr, function (err) {
    if (err) throw err;

    backSvr.on('message', function () {
            // Any worker that messages us is ready for more work
      workers.push(arguments[0]);
      if (arguments[2] !== 'READY') {
        frontSvr.send([arguments[2], arguments[3], arguments[4]]);
      }
    });
  });

  const frontSvr = zmq.socket('router');
  frontSvr.identity = 'frontSvr' + process.pid;
  frontSvr.bind(frontAddr, function (err) {
    if (err) throw err;

    frontSvr.on('message', function () {
      const args = Array.apply(null, arguments);

            // What if no workers are available? Delay till one is ready.
            // This is because I don't know the equivalent of zmq_poll
            // in Node.js zeromq, which is basically an event loop itself.
            // I start an interval so that the message is eventually sent. \
            // Maybe there is a better way.
      const interval = setInterval(function () {
        if (workers.length > 0) {
          backSvr.send([workers.shift(), '', args[0], '', args[2]]);
          clearInterval(interval);
        }
      }, 10);
    });
  });
}

process.on('SIGINT', function () {
    // TODO close all sockets like
    // socket.close();
  process.exit();
});

// Example is finished.

// Node process management noise below
if (cluster.isMaster) {
    // create the workers and clients.
    // Use env variables to dictate client or worker
  for (let i = 0; i < workers; i++) {
    cluster.fork({
      'TYPE': 'worker'
    });
  }

  cluster.on('death', function (worker) {
    console.log('worker ' + worker.pid + ' died');
  });

  let deadClients = 0;
  cluster.on('disconnect', function (worker) {
    deadClients++;
    if (deadClients === clients) {
      console.log('finished');
      process.exit(0);
    }
  });

  loadBalancer();
} else {
  if (process.env.TYPE === 'client') {
    clientProcess();
  } else {
    workerProcess();
  }
}
