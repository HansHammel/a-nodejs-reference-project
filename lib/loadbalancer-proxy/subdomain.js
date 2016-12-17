const subdomain = require('express-subdomain');
const express = require('express');
const app = express();
const router = express.Router(); // main api router
const v1Routes = express.Router();
const v2Routes = express.Router();

// api specific routes
v1Routes.get('/', function (req, res) {
  res.send('API - version 1');
});
v2Routes.get('/', function (req, res) {
  res.send('API - version 2');
});

v1Routes.get('/users', function (req, res) {
  res.json([
        {name: "Brian's Brother"}
  ]);
});
v2Routes.get('/users', function (req, res) {
  res.json([
        {name: 'Brian'}
  ]);
});

const checkUser = subdomain('*.api', function (req, res, next) {
  if (!req.session.user.valid) {
    return res.send('Permission denied.');
  }
  next();
});

// the api middleware flow
router.use(checkUser);
router.use(subdomain('*.v1', v1Routes));
router.use(subdomain('*.v2', v2Routes));

// basic routing..
router.get('/', function (req, res) {
  res.send('Welcome to the API!');
});

// attach the api
app.use(subdomain('api', router));

// example.com
app.get('/', function (req, res) {
  res.send('Homepage');
});

app.listen(3000);
