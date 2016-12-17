const HTTP_PORT = 8080;
const HTTP_HOST = '0.0.0.0';

require('sticky-cluster')(
    // server initialization function
    function (callback) {
      const http = require('http');
      const app = require('express')();
      const server = http.createServer(app);

        // configure an app
        // do some async stuff if needed

        // don't do server.listen(), just pass the server instance into the callback
      callback(server);
    },

    // options
  {
    concurrency: 10,
    port: HTTP_PORT,
    debug: true,
    env: function (index) {
      return {stickycluster_worker_index: index};
    }
  }
);
