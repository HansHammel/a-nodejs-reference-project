const fs = require('fs');
const ini = require('ini');

const config = {
  'sortToTop': [
    'name',
    'description',
    'version',
    'author'
  ],
  'required': [
    'name',
    'version'
  ],
  'warn': [
    'description',
    'author',
    'repository',
    'keywords',
    'main',
    'bugs',
    'homepage',
    'license'
  ],
  'requiredOnPrivate': [],
  'warnOnPrivate': [
    'name',
    'version',
    'description',
    'main'
  ],
  'sortedSubItems': [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
    'jshintConfig',
    'scripts',
    'keywords',
    'bin'
  ],
  'quiet': false,
  'files': [
    'package.json'
  ],
  'wipe': false
};

fs.writeFileSync('config_modified.ini', ini.stringify(config));

const conf = ini.parse(fs.readFileSync('test.ini', 'utf-8'));
fs.writeFileSync('conf.ini', ini.stringify(conf));
