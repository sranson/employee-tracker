const mysql = require("mysql");
require(`dotenv`).config();
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const start = () => {
  inquirer
    .prompt({
      name: "userAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "See All Employees",
        "See All Departments",
        "See All Roles",
      ],
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
        case "See All Employees":
          seeAllEmployees();
          break;
        case "See All Departments":
          seeAllDepartments();
          break;
        case "See All Roles":
          seeAllRoles();
          break;
      }
    });
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "deptName",
      type: "input",
      message: "What is the title of the Department?",
    })
    .then((answer) => {
      console.log(answer);
      connection.query(
        "INSERT INTO Departments SET ?",
        {
          department_name: answer.deptName,
        },
        (err) => {
          if (err) throw err;
          console.log(
            `You have successfully added ${answer.deptName} to the Departments table`
          );
          start();
        }
      );
    });
};

const addRole = () => {
  connection.query(
    "SELECT department_name, department_id FROM Departments",
    (err, results) => {
      if (err) throw err;
      const mappedResults = results.map((department) => {
        return {
          name: department.department_name,
          value: department.department_id,
        };
      });
      // console.log(mappedResults);
      inquirer
        .prompt([
          {
            name: "deptChoice",
            type: "rawlist",
            message: "What department does this role belong to?",
            choices: mappedResults,
          },
          {
            name: "roleTitle",
            type: "input",
            message: "What is the title of the role you would like to add?",
          },
          {
            name: "roleSalary",
            type: "input",
            message: "What is the salary for this role?",
          },
        ])
        .then((answers) => {
          connection.query("INSERT INTO Roles SET ?", {
            role_title: answers.roleTitle,
            role_salary: answers.roleSalary,
            department_id: answers.deptChoice,
          });
          console.log("SUCCESSFULLY ADDED THE ROLE");
          start();
        });
    }
  );
};

const addEmployee = () => {
  connection.query("SELECT role_title, role_id FROM Roles", (err, results) => {
    if (err) throw err;
    const mappedRoles = results.map((rolez) => {
      return {
        name: rolez.role_title,
        value: rolez.role_id,
      };
    });

    connection.query(
      "SELECT first_name, last_name, employee_id FROM Employees",
      (err, results) => {
        if (err) throw err;
        const mappedManagers = results.map((managers) => {
          let firstName = managers.first_name;
          let lastName = managers.last_name;
          return {
            name: `${firstName} ${lastName}`,
            value: managers.employee_id,
          };
        });
        inquirer
          .prompt([
            {
              name: "firstName",
              type: "input",
              message: "What is the employees first name?",
            },
            {
              name: "lastName",
              type: "input",
              message: "What is the employee's last name?",
            },
            {
              name: "employeeRole",
              type: "rawlist",
              message: "What is the employee's role?",
              choices: mappedRoles,
            },
            {
              name: "managerName",
              type: "rawlist",
              message: "Who is the employee's manager?",
              choices: mappedManagers,
            },
          ])
          .then((answers) => {
            connection.query("INSERT INTO Employees SET ?", {
              first_name: answers.firstName,
              last_name: answers.lastName,
              role_id: answers.employeeRole,
              manager_id: answers.managerName,
            });
            console.log("SUCCESSFULLY ADDED EMPLOYEE TO DATABASE");
            start();
          });
      }
    );
  });
};

function seeAllEmployees() {
  connection.query(
    "SELECT Employees.employee_id, Employees.first_name, Employees.last_name, Employees.manager_id, Roles.role_title, Roles.role_salary, Departments.department_name FROM Employees, Roles, Departments WHERE Employees.role_id = Roles.role_id AND Departments.department_id = Roles.department_id; ",
    (err, results) => {
      if (err) throw err;
      const mappedEmployees = results.map((employeez) => {
        const table = cTable.getTable([
          {
            id: employeez.employee_id,
            first_name: employeez.first_name,
            last_name: employeez.last_name,
            manager: employeez.manager_id,
            role: employeez.role_title,
            salary: employeez.role_salary,
            department: employeez.department_name,
          },
        ]);
        console.log("");
        console.table(table);
      });
    }
  );
  console.log("");
  start();
  console.log("");
}

function seeAllDepartments() {
  connection.query("SELECT * FROM Departments", (err, results) => {
    if (err) throw err;
    results.forEach((depts) => {
      console.log("--------------------------------------------------");
      console.log(`Department Name: ${depts.department_name}`);
      console.log("--------------------------------------------------");
    });
  });
}

function seeAllRoles() {
  connection.query("SELECT * FROM Roles", (err, results) => {
    if (err) throw err;
    results.forEach((roles) => {
      console.log("--------------------------------------------------");
      console.log(`Role ID: ${roles.role_id}`);
      console.log(`Role Title: ${roles.role_title}`);
      console.log(`Role Salary: ${roles.role_salary}`);
      console.log(`Role Department: ${roles.role_department}`);
      console.log("--------------------------------------------------");
    });
  });
}

start();
