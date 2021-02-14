const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// create writeFile function using promises instead of a callback function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the title of your repository/app?',
    },
    {
      type: 'list',
      name: 'license',
      message: 'What license do you use?', 
      choices: ['MIT', 'GNU-GPLv3', 'Apache', 'Personal/Proprietary']
    },
    {
      type: 'input',
      name: 'email',
      message: 'What is your email?',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'What is your app used for?',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Please outline how to install your application!',
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username',
    },
    {
      type: 'input',
      name: 'linkedin',
      message: 'Enter your LinkedIn URL.',
    },
  ]);
};

const generateReadme = (answers) =>
  ` 
  # ${answers.name}

  ### License: ![License](https://img.shields.io/static/v1?label=${answers.license}&message=License)

  ## Table of Contents:
  1. [Description](###description)
  2. [Usage](###usage)
  3. [Installation](###installation)

  ### Description
  ${answers.usage}

  ### Usage 
  ${answers.usage}

  ### Installation
  ${answers.installation}

  ### Contact/FAQ
  Please contact me at ${answers.email} if you have any questions regarding the application!
  Further professional contact at ${answers.linkedin}.

  `;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync(`${answers.name}.md`, generateReadme(answers)))
    .then(() => console.log('Writing successful.'))
    .catch((err) => console.error(err));
};

init();