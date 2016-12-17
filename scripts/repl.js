// require this file in your app and use telnet to connect like so
// telnet localhost 1337

const repl = require('repl');
const net = require('net');

module.exports = net.createServer(function (socket) {
  const r = repl.start({
    prompt: '[' + process.pid + '] ' + socket.remoteAddress + ':' + socket.remotePort + '> ',
    input: socket,
    output: socket,
    terminal: true,
    useGlobal: false
  });
  r.on('exit', function () {
    socket.end();
  });
  r.context.socket = socket;
}).listen(1337);
