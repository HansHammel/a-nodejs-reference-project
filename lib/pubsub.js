// can be used with Redis, AMQP (RabbitMQ), ZeroMQ, MQTT (Mosquitto), ...
const ascoltatori = require('ascoltatori');
const settings = {
  type: 'redis',
  redis: require('redis'),
  db: 12,
  port: 6379,
  host: '127.0.0.1'
};

ascoltatori.build(settings, function (ascoltatore) {
  ascoltatore.subscribe('hello/*', function () {
        // this will print { '0': "hello/there/world", '1': "a message" }
    console.log(arguments);
  });

  ascoltatore.subscribe('*', function () {
        // this will print { '0': "hello/there/world", '1': "a message" }
    console.log(arguments);
  });

  ascoltatore.subscribe('hello/there/world/*', function () {
        // this will print { '0': "hello/there/world", '1': "a message" }
    console.log(arguments);
  });

  ascoltatore.publish('hello/there/world', 'a message', function () {
    console.log('message published');
  });
});
