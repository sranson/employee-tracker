
require(`dotenv`).config();
const inquirer = require('inquirer');
const mysql = require('mysql');


// create the connection information for the sql database
const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: process.env.DB_USERNAME,
  
    // Your password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  // console.log(connection);

  const start = () => {
    inquirer.prompt({
      name: 'userAction',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Add Department', 'Add Role', 'Add Employee'],
    })
    .then((answer) => {
      // console.log(answer);
      switch (answer.userAction) {
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
      }
    })
  }


  const addDepartment = () => {
    console.log('User wants to add a department');
  }

  const addRole = () => {
    console.log('User wants to add a role');
  }

  const addEmployee = () => {
    console.log('User wants to add an employee');
  }


  start();