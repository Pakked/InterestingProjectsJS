const inquirer = import('inquirer');

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
      type: 'list',
      name: 'color',
      message: 'What is your favorite color?',
      choices: ['Red', 'Green', 'Blue', 'Yellow']
    }
  ])
  .then(answers => {
    console.log(`Hi ${answers.name}, your favorite color is ${answers.color}`);
  });
