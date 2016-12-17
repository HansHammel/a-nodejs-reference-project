const client = require('socket.io-client');

// Create our connection to the server.
const ws = client.connect('ws://localhost:8014');

// Listen for incoming messages and log them.
ws.on('message', function (msg) {
  console.log('Message:', msg);
});
