const fixme = require('fixme');
const Convert = require('ansi-to-html');
// let convert = new Convert();
// let path = require('path');
// let fs = require('fs');
// let open = require('open');
const marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
});
/* eslint-disable no-extend-native */
String.prototype.replaceAll = function (search, replacement) {
  const target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
/* eslint-enable no-extend-native */
fixme({
  path: __dirname,
    // path: path.resolve(process.cwd()),
    // ignored_directories: ['vendors/**', 'vendor/**', 'bower_components/**', 'jspm_packages/**', 'node_modules/**', '.git/**', '.hg/**'],
    // file_patterns: ['**/*.js', 'Makefile', '**/*.sh'],
  file_encoding: 'utf8',
  line_length_limit: 40000,
  color: true,
  md: true
}, function (out) {
    // console.log(convert.toHtml(out));

  console.log('t');
    /*
     fs.writeFileSync(path.join(__dirname,'..','TODO.html'),convert.toHtml(marked(out))
     .replaceAll('✓','&#10004;')
     .replaceAll('✐','&#x2710;')
     .replaceAll('➴','&#x27B4;')
     .replaceAll('✄','&#x2704;')
     .replaceAll('✗','&#x2717;')
     .replaceAll('☠','&#x2620;')
     .replaceAll('☢','&#x2622;')
     ,'utf8');
     fs.writeFileSync(path.join(__dirname,'..','TODO.md'),out,'utf8');
     open(path.join(__dirname,'..','TODO.html'));
     */
});
