const http = require('https');
const fs = require('fs');
const proxy = require('http-proxy');
const request = require('request');

http.globalAgent.maxSockets = 10240;

// Define the servers to load balance.
const servers = [
    {host: '127.0.0.1', port: 8014},
    {host: '127.0.0.1', port: 8014},
    {host: '127.0.0.1', port: 8014}
];
const failoverTimer = [];

// load the SSL cert
let ca = [
    // fs.readFileSync('./certs/PositiveSSLCA2.crt'),
    // fs.readFileSync('./certs/AddTrustExternalCARoot.crt')
];
const opts = {
    // ca: ca,
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.crt')
};

// Create a proxy object for each target.
const proxies = servers.map(function (target) {
  return proxy.createProxyServer({
    target: target,
    ws: true,
    xfwd: true,
    ssl: opts,
    down: false
  });
});

/**
 * Select a random server to proxy to. If a 'server' cookie is set, use that
 * as the sticky session so the user stays on the same server (good for ws fallbacks).
 * @param  {Object} req HTTP request data
 * @param  {Object} res HTTP response
 * @return {Number}     Index of the proxy to use.
 */
const selectServer = function (req, res) {
  let index = -1;
  let i = 0;

    // Check if there are any cookies.
  if (req.headers && req.headers.cookie && req.headers.cookie.length > 1) {
    const cookies = req.headers.cookie.split('; ');

    for (i = 0; i < cookies.length; i++) {
      if (cookies[i].indexOf('server=') === 0) {
        const value = cookies[i].substring(7, cookies[i].length);
        if (value && value !== '') {
          index = value;
          break;
        }
      }
    }
  }

    // Select a random server if they don't have a sticky session.
  if (index < 0 || !proxies[index]) {
    index = Math.floor(Math.random() * proxies.length);
  }

    // If the selected server is down, select one that isn't down.
  if (proxies[index].options.down) {
    index = -1;

    let tries = 0;
    while (tries < 5 && index < 0) {
      const randIndex = Math.floor(Math.random() * proxies.length);
      if (!proxies[randIndex].options.down) {
        index = randIndex;
      }

      tries++;
    }
  }

  index = index >= 0 ? index : 0;

    // Store the server index as a sticky session.
  if (res) {
    res.setHeader('Set-Cookie', 'server=' + index + '; path=/');
  }

  return index;
};

/**
 * Fired when there is an error with a request.
 * Sets up a 10-second interval to ping the host until it is back online.
 * There is a 10-second buffer before requests start getting blocked to this host.
 * @param  {Number} index Index in the proxies array.
 */
const startFailoverTimer = function (index) {
  if (failoverTimer[index]) {
    return;
  }

  failoverTimer[index] = setTimeout(function () {
        // Check if the server is up or not
    request({
      url: 'http://' + proxies[index].options.target.host + ':' + proxies[index].options.target.port,
      method: 'HEAD',
      timeout: 10000
    }, function (err, res, body) {
      if (err) { console.error(err); }
      failoverTimer[index] = null;

      if (res && res.statusCode === 200) {
        proxies[index].options.down = false;
        console.log('Server #' + index + ' is back up.');
      } else {
        proxies[index].options.down = true;
        startFailoverTimer(index);
        console.log('Server #' + index + ' is still down.');
      }
    });
  }, 10000);
};

// Select the next server and send the http request.
const serverCallback = function (req, res) {
  const proxyIndex = selectServer(req, res);
  const proxy = proxies[proxyIndex];
  proxy.web(req, res);

  proxy.on('error', function (err) {
    if (err) { console.error(err); }
    startFailoverTimer(proxyIndex);
  });
};
const server = http.createServer(opts, serverCallback);

// Get the next server and send the upgrade request.
server.on('upgrade', function (req, socket, head) {
  const proxyIndex = selectServer(req);
  const proxy = proxies[proxyIndex];
  proxy.ws(req, socket, head);

  proxy.on('error', function (err, req, socket) {
    if (err) { console.error(err); }
    socket.end();
    startFailoverTimer(proxyIndex);
  });
});

server.listen(8443);
