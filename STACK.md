Load Balancer
	Nginx, HAProxy, node-http-proxy, hipache
	*We need either a sessionless loadbalancer for stateless servers, or a sticky-session loadbalancer with state-aware servers behind*
	*Note: Sessionawareness comes only with the paid version of nginx, Nginx Plus*
	*HAProxy is no option on windows*
	*hipache - deprecated*

//promise öibrary
+ bluebird

//ORM
+ Sequelize, Multi dialect ORM for Node.JS/io.js. It was authored by Sascha Depold on May, 2011.
Knex, A batteries-included SQL query & schema builder for Postgres, MySQL and SQLite3 and the Browser. It was authored by Tim Griesser on May, 2013.
Bookshelf, A lightweight ORM for PostgreSQL, MySQL, and SQLite3. It was authored by Tim Griesser on Apr, 2013.
Objection, An SQL-friendly ORM for Node.js. It was authored by Sami Koskimäki on Jun, 2012.
Orm, NodeJS Object-relational mapping. It was authored by Diogo Resende on Mar, 2011.
Waterline, An ORM for Node.js and the Sails framework. It was authored on Dec, 2012.

https://npmcompare.com

//commandline args - minimist
commander ×minimist ×nomnom ×optimist ×yargs
Commander, the complete solution for node.js command-line programs. It was authored by TJ Holowaychuk on Aug, 2011.
+ Minimist, parse argument options. It was authored by James Halliday on Jun, 2013.
, It was authored on Dec, 2016.
Optimist, Light-weight option parsing with an argv hash. No optstrings attached. It was authored by James Halliday on Dec, 2010.
, It was authored on Dec, 2016.

//sql generator libraries
Knex	3500	30	schema	javascript	transactions, migrations, promises, connection pooling
Squel	1000	3	schemaless	coffeescript
node-sql	2600	59	schema	javascript
mongo-sql	1700	49	schemaless	javascript
gesundheit	1600	21	schemaless	coffeescript	uses Any-DB to wrap the DB driver
sql-bricks	1100	1	schemaless	javascript

Browserify, browser-side require() the node way. It was authored by James Halliday on Feb, 2011.
Grunt, The JavaScript Task Runner. It was authored by Grunt Development Team on Jan, 2012.
Gulp, The streaming build system. It was authored by Fractal on Jul, 2013.
+ Webpack, Packs CommonJs/AMD modules for the browser. Allows to split your codebase into multiple bundles, which can be loaded on demand. Support loaders to preprocess files, i.e. json, jade, coffee, css, less, ... and your custom stuff. It was authored by Tobias Koppers @sokra on Mar, 2012.
Jspm, Registry and format agnostic JavaScript package manager. It was authored on Apr, 2013.

Axios, Promise based HTTP client for the browser and node.js. It was authored by Matt Zabriskie on Aug, 2014.
Got, Simplified HTTP requests. It was authored on Mar, 2014.
Request, Simplified HTTP request client. It was authored by Mikeal Rogers on Jan, 2011.
Reqwest, A wrapper for asynchronous http requests. It was authored by Dustin Diaz on Apr, 2011.
Superagent, elegant & feature rich browser / node HTTP with a fluent API. It was authored by TJ Holowaychuk on Aug, 2011.


serverm frameworks
express
actionhero
koa
hapi
restify
loopback
sails
feathers
Kraken
Meteor
Express
Connect
Sails
Koa
Derby
Kraken
Hapi
Connect
LoopBack
Restify
Geddy
CompoundJS
Flatiron



husky - githooks, expressed as aditional scripts like precommit, prepush, etc.. in package.json    alternative:https://github.com/tarmolov/git-hooks-js
standard - for linting
standard-version - for versioning