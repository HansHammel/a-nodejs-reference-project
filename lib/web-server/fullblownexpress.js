const http = require('http');
const st = require('st');
const createStatic = require('connect-static');
const qs = require('qs');
const multipart = require('connect-multiparty');
const Cookies = require('cookies');
const cons = require('consolidate');
const express = require('express');
const assert = require('assert');
const open = require('open');

const getRawBody = require('raw-body');
const path = require('path');

const app = express();
const multipartMiddleware = multipart();
const cookieKeys = 'ff';

let mount = st({
  path: 'resources/static/', // resolved against the process cwd
  url: 'static/', // defaults to '/'

  cache: { // specify cache:false to turn off caching entirely
    fd: {
      max: 1000, // number of fd's to hang on to
      maxAge: 1000 * 60 * 60 // amount of ms before fd's expire
    },

    stat: {
      max: 5000, // number of stat objects to hang on to
      maxAge: 1000 * 60 // number of ms that stats are good for
    },

    content: {
      max: 1024 * 1024 * 64, // how much memory to use on caching contents
      maxAge: 1000 * 60 * 10, // how long to cache contents for
            // if `false` does not set cache control headers
      cacheControl: 'public, max-age=600' // to set an explicit cache-control
            // header value
    },

    index: { // irrelevant if not using index:true
      max: 1024 * 8, // how many bytes of autoindex html to cache
      maxAge: 1000 * 60 * 10 // how long to store it for
    },

    readdir: { // irrelevant if not using index:true
      max: 1000, // how many dir entries to cache
      maxAge: 1000 * 60 * 10 // how long to cache them for
    }
  },

    // indexing options
  index: true, // auto-index, the default
    // index: 'index.html', // use 'index.html' file as the index
    // index: false, // return 404's for directories

  dot: false, // default: return 403 for any url with a dot-file part
    // dot: true, // allow dot-files to be fetched normally

  passthrough: true, // calls next/returns instead of returning a 404 error
    // passthrough: false, // returns a 404 when a file or an index is not found

  gzip: true, // default: compresses the response with gzip compression
    // gzip: false, // does not compress the response, even if client accepts gzip

  cors: false // default: static assets not accessible from other domains
    // cors: true // static assets can be accessed from any domain
});

// with express
app.use(mount);
// or
app.route('/static/:fooblz', function (req, res, next) {
  mount(req, res, next); // will call next() if it doesn't do anything
});

app.post('/upload', multipartMiddleware, function (req, resp) {
  console.log(req.body, req.files);
    // don't forget to delete all req.files when done
});

let server2 = http.createServer(function (req, res) {
  const cookies = new Cookies(req, res, {'keys': cookieKeys});
  let unsigned, signed, tampered;

  if (req.url === '/set') {
    cookies
        // set a regular cookie
            .set('unsigned', 'foo', {httpOnly: false})

            // set a signed cookie
            .set('signed', 'bar', {signed: true})

            // mimic a signed cookie, but with a bogus signature
            .set('tampered', 'baz')
            .set('tampered.sig', 'bogus');

    res.writeHead(302, {'Location': '/'});
    return res.end("Now let's check.");
  }

  unsigned = cookies.get('unsigned');
  signed = cookies.get('signed', {signed: true});
  tampered = cookies.get('tampered', {signed: true});

  assert.equal(unsigned, 'foo');
  assert.equal(signed, 'bar');
  assert.notEqual(tampered, 'baz');
  assert.equal(tampered, undefined);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(
        'unsigned expected: foo\n\n' +
        'unsigned actual: ' + unsigned + '\n\n' +
        'signed expected: bar\n\n' +
        'signed actual: ' + signed + '\n\n' +
        'tampered expected: undefined\n\n' +
        'tampered: ' + tampered + '\n\n'
    );
});

// assign the swig engine to .html files
app.engine('html', cons.swig);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

const users = [];
users.push({name: 'tobi'});
users.push({name: 'loki'});
users.push({name: 'jane'});

app.get('/', function (req, res) {
  res.render('index', {
    title: 'Consolidate.js'
  });
});

app.get('/users', function (req, res) {
  res.render('users', {
    title: 'Users',
    users: users
  });
});

if (!module.parent) {
  var server = http.createServer(app);
  server.on('error', function (e) {    // do not fail silently on error, particularly annoying in development.
    if (e.code === 'EADDRINUSE') {
      console.log('Failed to bind to port - address already in use ');
      process.exit(1);
    }
  });
  server.listen(3000, function () {
    console.log('Express listening on http://localhost:3000');
    console.log('visit http://localhost:3000');
    open('http://localhost:3000');
  });
} else {
    // for our tests
  module.exports = app;
}

