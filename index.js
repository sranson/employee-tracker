
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


  const start = () => {
    inquirer.prompt({
      name: 'userAction',
      type: 'list',
      message: 'What would you like to do?',
      choices: ['Add Department', 'Add Role', 'Add Employee', 'See All Employees', 'See All Departments', 'See All Roles'],
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
        case 'See All Employees':
          seeAllEmployees()
          break;
        case 'See All Departments':
          seeAllDepartments()
          break;
        case 'See All Roles':
          seeAllRoles()
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
        for (i=0; i < results.length; i++) {
          deptArray.push(results[i].department_name);
        }      
      inquirer.prompt([
        {
          name: 'deptChoice',
          type: 'rawlist',
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
            role_department: answers.deptChoice
          }
        )
        console.log('SUCCESSFULLY ADDED THE ROLE');
        start();
      })
    })
  }


  const addEmployee = () => {   
    const roleArray = []; 
    const managerArray = [];
    connection.query('SELECT role_title FROM Roles', (err, results) => {
      if (err) throw err;
        for (i=0; i < results.length; i++) {
          roleArray.push(results[i].role_title);
        }  
      })  

      connection.query('SELECT first_name, last_name FROM Employees', (err, results) => {
        if (err) throw err;
          for (i=0; i < results.length; i++) {
            let firstName = results[i].first_name;
            let lastName = results[i].last_name;
            let fullName = `${firstName} ${lastName}`
            managerArray.push(fullName);
          }  
        })  
    inquirer.prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the employee\s first name?'
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the employee\'s last name?'
      },
      {
        name: 'employeeRole',
        type: 'rawlist',
        message: 'What is the employee\'s role?',
        choices: roleArray
      },
      {
        name: 'managerName',
        type: 'rawlist',
        message: 'Who is the employee\'s manager?',
        choices: managerArray
      }
    ])
    .then((answers) => {
      console.log(answers);
    })
  }

  function seeAllEmployees() {
    connection.query('SELECT * FROM Employees', (err, results) => {
      if (err) throw err;
      results.forEach((people) => {
        let firstName = people.first_name;
        let lastName = people.last_name
        let roleID = people.role_id
        let managerID = people.manager_id
        console.log(`${firstName} ${lastName} --- Role ID: ${roleID} --- Manager ID: ${managerID}`);
      })
    })
  }


  function seeAllDepartments() {
    connection.query('SELECT * FROM Departments', (err, results) => {
      if (err) throw err;
      results.forEach((depts) => {
        console.log(depts.department_name);
      })
    })
    start();
  }


  function seeAllRoles() {
    connection.query('SELECT * FROM Roles', (err, results) => {
      if (err) throw err;
      results.forEach((roles) => {
        console.log(roles.role_id);
        console.log(roles.role_title);
        console.log(roles.role_salary);
        console.log(roles.role_department);
        console.log('--------------------------------------------------');
      })
    })
    start();
  }



  start();