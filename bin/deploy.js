#! /usr/bin/env node

const inquirer = require('inquirer');
const shelljs = require('shelljs');

const questions = [
  {
    type: 'input',
    name: 'branch',
    message: 'Branch'
  }
];

shelljs.exec('git branch', function (code, stdout, stderr) {
  if (code !== 0) {
    console.error('Error: Git commit failed');
    process.exit(1);
  }
    //  console.log('Program output:', stdout);
    //  console.log('Program stderr:', stderr);
  inquirer.prompt(questions, function (answers) {
    console.log('executing:', 'npm run build && npm run git-commit && npm run git-push');
        // git push origin master --force
    shelljs.exec('git push ' + answers.branch + ' --force', function (code, stdout, stderr) {
      if (code !== 0) {
        console.error('Error: Git commit failed');
        process.exit(1);
      }
    });
  });
});

