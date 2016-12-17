const mosca = require('mosca');

let ascoltatore = {
    // using ascoltatore
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};

const settings = {
  port: 4883,
    // host: "127.0.0.1", // specify an host to bind to a single interface
  id: 'mymosca', // used to publish in the $SYS/<id> topicspace
  stats: true, // publish stats in the $SYS/<id> topicspace
  logger: {
    level: 'info'
  },
  backend: {
    type: 'redis',
    port: 6379,
    host: 'localhost',
    return_buffers: true
  },
  persistence: {
    factory: mosca.persistence.Redis,
    port: 6379,
    host: 'localhost'
  },
  secure: {
    keyPath: '/path/to/key',
    certPath: '/path/to/cert'
  }
};

const server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
  console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
  console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup () {
  console.log('Mosca server is up and running');
}
