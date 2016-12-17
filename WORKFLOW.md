//get the current version
	git clone theproject
//or
	git checkout master
	git pull origin master
//check your tasks and comments	
	npm run fixme
// uses eslint  with standard rules
// see http://standardjs.com/ for eslint annotaions
	npm run standard
//	npm run standard-fix
//prepare the commit, bumb the version and generate a changelog
	npm run stanard-version
//sync gitignore into npmingore
	npm run npmignore
//push to git	
	git push --follow-tags origin master	
publish to npm
	npm publish

slc loopback
slc loopback:model product
slc loopback:model category
slc loopback:acl
slc loopback:datasource

http://eslint.org/docs/user-guide/configuring

/* eslint-env browser, node, commonjs, shared-node-browser, es6, worker, amd, mocha, jasmine, jest, phantomjs, protractor, qunit, jquery, prototypejs, shelljs, meteor, mongo, applescript, nashorn,  serviceworker, atomtest, embertest, webextensions, greasemonkey */

//nodesecurity.io
npm run nsp

//profiling
node --prof some.js
npm install -g node-tick 
node-tick-processor v8.log

//debugging
set DEBUG=*
node --debug some.js


// https://flowtype.org/docs/getting-started.html
add // @flow at top of files
touch .flowconfig
npm install --save-dev flow-bin
npm run flow
$> npm install -g babel-cli
$> npm install --save-dev babel-plugin-transform-flow-strip-types
$> echo '{"plugins": ["transform-flow-strip-types"]}' > .babelrc

//Generate a PKI
openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
openssl rsa -passin pass:x -in server.pass.key -out server.key
rm server.pass.key
openssl req -new -key server.key -out server.csr
openssl x509 -req -sha256 -days 365 -in server.csr -signkey server.key -out server.crt

//create a feature branch
git checkout -b new-feature
git commit -am 'Added some feature'
git push origin new-feature

//Stroage
OpenAFS
Infinit Storage Platform

//TODO
https://github.com/insin/package-config-checker
https://github.com/semantic-release/semantic-release
https://github.com/commitizen/cz-cli

openssl req -new -x509 -days 9000 -config ca1.cnf -keyout ca1-key.pem -out ca1-cert.pem
openssl genrsa -out agent1-key.pem 1024
openssl req -new -config agent1.cnf -key agent1-key.pem -out agent1-csr.pem
openssl x509 -req -days 9000 -passin "pass:password" -in agent1-csr.pem -CA ca1-cert.pem -CAkey ca1-key.pem -CAcreateserial -out agent1-cert.pem
openssl verify -CAfile ca1-cert.pem agent1-cert.pem
openssl genrsa -out agent2-key.pem 1024
openssl req -new -config agent2.cnf -key agent2-key.pem -out agent2-csr.pem
openssl x509 -req -days 9000 -passin "pass:password" -in agent2-csr.pem -CA ca1-cert.pem -CAkey ca1-key.pem -CAcreateserial -out agent2-cert.pem
openssl verify -CAfile ca1-cert.pem agent2-cert.pem
rm -f *.pem *.srl