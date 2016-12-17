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