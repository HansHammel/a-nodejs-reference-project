#! /usr/bin/env node

const inquirer = require('inquirer');
const shelljs = require('shelljs');

const questions = [
  {
    type: 'input',
    name: 'message',
    message: 'Commit message'
  }
];

inquirer.prompt(questions, function (answers) {
  console.log('git push ' + answers.branch + ' --force');
  shelljs.exec('git push ' + answers.branch + ' --force', function (code, stdout, stderr) {
    if (code !== 0) {
      console.error('Error: Git commit failed');
      process.exit(1);
    }
  });
});
