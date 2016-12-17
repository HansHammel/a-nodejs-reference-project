const fixme = require('fixme');
fixme({
  path: './',
  ignored_directories: ['node_modules', 'bower_packages'],
  file_patterns: ['**/*.js'],
  file_encoding: 'utf8',
  line_length_limit: 1000
});

// run standard-version instead ov npm version to bump the version
const standardVersion = require('standard-version');
// Options are the same as command line, except camelCase
standardVersion({
  noVerify: true,
  infile: 'CHANGELOG.md',
  silent: true
}, function (err) {
  if (err) {
    console.error(`standard-version failed with message: ${err.message}`);
  }
    // standard-version is done
});

