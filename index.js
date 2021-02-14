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
      choices: ['MIT', 'GNU-GPLv3', 'Apache', 'ISC']
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
      name: 'description',
      message: 'Describe how your application works.',
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
    {
      type: 'input',
      name: 'test',
      message: 'How does one test your application?',
    },
  ]);
};

const generateReadme = (answers) =>
  ` 
  # ${answers.name}

  ## Table of Contents:
  1. [Description](###description)
  2. [Usage](###usage)
  3. [Installation](###installation)
  4. [Questions](###questions)
  5. [Tests](###tests)
  6. [Contributing](###contributing)

  ### License: ![License](https://img.shields.io/static/v1?label=${answers.license}&message=License)

  ### Description
  > ${answers.description}

  ### Usage 
  ${answers.usage}

  ### Installation
  ${answers.installation}

  ### Questions
  - Please contact me at ${answers.email} if you have any questions regarding the application!
  - Further professional contact at my LinkedIN: [Linked](https://www.linkedin.com/in/${answers.linkedin}/)
  - Github: [Git](github.com/${answers.github}/)

  ### Tests
  ${answers.test}

  ### Contributing
  If you wish to contribute to this application please send a request to me at: ${answers.email}.
  Or you can also send an issue via github to me at: [Git](github.com/${answers.github}/)

  `;

// Bonus using writeFileAsync as a promise
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync(`${answers.name}.md`, generateReadme(answers)))
    .then(() => console.log('Writing successful.'))
    .catch((err) => console.error(err));
};

init();