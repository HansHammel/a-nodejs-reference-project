const HTTP_PORT = 8080;
const HTTP_HOST = '0.0.0.0';
const REDIS_PORT = 6379;
const REDIS_HOST = '127.0.0.1';

// manage session across nodes/servers
const io = require('socket.io')(HTTP_PORT);
/*
 var redis = require('socket.io-redis');
 var adapter = redis({ host: 'localhost', port: 6379 });
 adapter.pubClient.on('error', function(){});
 adapter.subClient.on('error', function(){});
 io.adapter(adapter);
 */
const redis = require('redis').createClient;
const adapter = require('socket.io-redis');
const pub = redis(REDIS_PORT, REDIS_HOST, {auth_pass: 'pwd'});
const sub = redis(REDIS_PORT, REDIS_HOST, {auth_pass: 'pwd'});
io.adapter(adapter({pubClient: pub, subClient: sub}));
