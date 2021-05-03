
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
    inquirer.prompt(
      {
        name: 'deptName',
        type: 'input',
        message: 'What is the title of the Department?'
      }
    ).then((answer) => {
      connection.query(
        'INSERT INTO Departments SET ?',
        {
          department_name: answer.deptName
        },
        (err) => {
          if (err) throw err;
          console.log(`You have successfully added ${answer.deptName} to the Departments table`);
          start();
        }
      )
    })
  }



  const addRole = () => {
    const deptArray = [];
    connection.query('SELECT department_name FROM Departments', (err, results) => {
      if (err) throw err;
      // console.log(results);
      for (i=0; i < results.length; i++) {
        deptArray.push(results[i].department_name);
      }      
    inquirer.prompt([
      {
        name: 'deptChoice',
        type: 'list',
        message: 'What department does this role belong to?',
        choices: deptArray,
      },
      {
        name: 'roleTitle',
        type: 'input',
        message: 'What is the title of the role you would like to add?'
      },
      {
        name: 'roleSalary',
        type: 'input',
        message: 'What is the salary for this role?'
      },
    ]).then((answers) => {
      connection.query(
        'INSERT INTO Roles SET ?',
        {
          role_title: answers.roleTitle,
          role_salary: answers.roleSalary,
        }
      )
      console.log('SUCCESSFULLY ADDED THE ROLE');
      start();
    })
  })
  }

  const addEmployee = () => {
    console.log('User wants to add an employee');
  }


  start();