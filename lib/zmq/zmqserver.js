// Hello World server
// Binds REP socket to tcp://*:5555
// Expects "Hello" from client, replies with "world"

const zmq = require('zmq');

// socket to talk to clients
const responder = zmq.socket('rep');

responder.on('message', function (request) {
  console.log('Received request: [', request.toString(), ']');

    // do some 'work'
  setTimeout(function () {
        // send reply back to client.
    responder.send('World');
  }, 1000);
});

responder.bind('tcp://*:5555', function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Listening on 5555�');
  }
});

process.on('SIGINT', function () {
  responder.close();
});
