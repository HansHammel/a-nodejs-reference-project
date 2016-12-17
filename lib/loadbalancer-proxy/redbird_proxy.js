import path from 'path';
import redbird from 'redbird';

// OPTIONAL: Setup your proxy but disable the X-Forwarded-For header
let proxy = redbird({port: 80, xfwd: true});

// Route to any global ip
proxy.register('optimalbits.com', 'http://167.23.42.67:8000');

// Route to any local ip, for example from docker containers.
proxy.register('example.com', 'http://172.17.42.1:8001');

// Route from hostnames as well as paths
proxy.register('example.com/static', 'http://172.17.42.1:8002');
proxy.register('example.com/media', 'http://172.17.42.1:8003');

// Subdomains, paths, everything just works as expected
proxy.register('abc.example.com', 'http://172.17.42.4:8080');
proxy.register('abc.example.com/media', 'http://172.17.42.5:8080');

// Route to any href including a target path
proxy.register('foobar.example.com', 'http://172.17.42.6:8080/foobar');

// You can also enable load balancing by registering the same hostname with different
// target hosts. The requests will be evenly balanced using a Round-Robin scheme.
proxy.register('balance.me', 'http://172.17.40.6:8080');
proxy.register('balance.me', 'http://172.17.41.6:8080');
proxy.register('balance.me', 'http://172.17.42.6:8080');
proxy.register('balance.me', 'http://172.17.43.6:8080');
/*
// LetsEncrypt support
// With Redbird you can get zero conf and automatic SSL certificates for your domains
let redbird = redbird({port: 80, xfwd: true});
redbird.register('example.com', 'http://172.60.80.2:8082', {
  ssl: {
    letsencrypt: {
      email: 'john@example.com', // Domain owner/admin email
      production: true // WARNING: Only use this flag when the proxy is verified to work correctly to avoid being banned!
    }
  }
});

//
// LetsEncrypt requires a minimal web server for handling the challenges, this is by default on port 3000
// it can be configured when initiating the proxy. This web server is only used by Redbird internally so most of the time
// you  do not need to do anything special other than avoid having other web services in the same host running
// on the same port.

//
// HTTP2 Support using LetsEncrypt for the certificates
//
let proxy = redbird({
  letsencrypt: {
    path: path.join(__dirname, 'certs'),
    port: 9999
  },
  ssl: {
    http2: true
  }
});
*/
