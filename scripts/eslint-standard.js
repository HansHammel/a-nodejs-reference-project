let Linter = require('standard-engine').linter;
let opts = require('./eslint-standard-options.js');

module.exports = new Linter(opts);
