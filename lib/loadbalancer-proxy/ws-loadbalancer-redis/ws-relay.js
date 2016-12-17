const http = require('http');
const io = require('socket.io');
const redis = require('redis');

// Setup Redis pub/sub.
// NOTE: You must create two Redis clients, as
// the one that subscribes can't also publish.
const pub = redis.createClient();
const sub = redis.createClient();
sub.subscribe('global');

// Listen for messages being published to this server.
sub.on('message', function (channel, msg) {
    // Broadcast the message to all connected clients on this server.
  for (let i = 0; i < clients.length; i++) {
    clients[i].write(msg);
  }
});

// Setup our ws server.
const clients = [];
const echo = io.listen(9014);

echo.on('connection', function (client) {
    // Add this client to the client list.
  clients.push(client);

    // Listen for data coming from clients.
  client.on('message', function (msg) {
        // Publish this message to the Redis pub/sub.
    pub.publish('global', msg);
  });

    // Remove the client from the list.
  client.on('close', function () {
    clients.splice(clients.indexOf(client), 1);
  });
});

// Begin listening.
const server = http.createServer();
// echo.installHandlers(server, {prefix: '/sockjs'});
server.listen(8014);
