// client
const HTTP_PORT = 8080;
const HTTP_HOST = '0.0.0.0';

const io = require('socket.io-emitter')({host: HTTP_HOST, port: HTTP_PORT});
setInterval(function () {
  io.emit('time', new Date());
}, 5000);
