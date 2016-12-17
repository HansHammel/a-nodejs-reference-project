
//
// just to make these example a little bit interesting,
// make a little key value store with an http interface
// (see couchdb for a grown-up version of this)
//
// API:
// GET /
// retrive list of keys
//
// GET /[url]
// retrive object stored at [url]
// will respond with 404 if there is nothing stored at [url]
//
// POST /[url]
//
// JSON.parse the body and store it under [url]
// will respond 400 (bad request) if body is not valid json.
//
// TODO: cached map-reduce views and auto-magic sharding.
//
const Store = module.exports = function Store () {
  this.store = {};
};

Store.prototype = {
  get: function (key) {
    return this.store[key];
  },
  set: function (key, value) {
    this.store[key] = value;
    return this.store[key];
  },
  handler: function () {
    const store = this;
    return function (req, res) {
      function send (obj, status) {
        res.writeHead(200 || status, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(obj) + '\n');
        res.end();
      }
      const url = req.url.split('?').shift();
      if (url === '/') {
        console.log('get index');
        return send(Object.keys(store.store));
      } else if (req.method === 'GET') {
        let obj2 = store.get(url);
        send(obj2 || {error: 'not_found', url: url}, obj2 ? 200 : 404);
      } else {
        // post: buffer body, and parse.
        let body = '';
        let obj2;
        req.on('data', function (c) { body += c; });
        req.on('end', function (c) {
          let obj;
          try {
            obj = JSON.parse(body);
          } catch (err) {
            return send(err, 400);
          }
          store.set(url, obj);
          send({ok: true});
        });
      }
    };
  }
};
