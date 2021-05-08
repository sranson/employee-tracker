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
        "See All Departments",
        "See All Roles",
        "See All Employees",
        "Update Employee Role",
        "Update Employee Manager",
        "See All Employees by Manager",
        "Delete a Department",
        "Delete a Role",
        "Exit",
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
        case "Update Employee Role":
          selectEmployeeToUpdate();
          break;
        case "Update Employee Manager":
          startManagerUpdate();
          break;
        case "See All Employees by Manager":
          startManagerFilter();
          break;
        case "Delete a Department":
          deleteDepartment();
          break;
        case "Delete a Role":
          deleteRole();
          break;
        case "Exit":
          exitProgram();
          break;
      }
    });
  console.log(``);
};

const addDepartment = () => {
  inquirer
    .prompt({
      name: "deptName",
      type: "input",
      message: "What is the title of the Department?",
    })
    .then((answer) => {
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
    "SELECT emp.employee_id AS 'ID', concat(emp.first_name, ' ' ,emp.last_name) AS 'Employee', concat(man.first_name, ' ' ,man.last_name) AS 'Manager', Roles.role_title AS 'Role', Roles.role_salary AS 'Salary', Departments.department_name AS 'Department' FROM Employees emp, Employees man, Roles, Departments WHERE emp.role_id = Roles.role_id AND Departments.department_id = Roles.department_id  AND man.employee_id = emp.manager_id UNION  SELECT Employees.employee_id, concat(Employees.first_name, ' ' ,Employees.last_name) AS 'Employee', Employees.manager_id, Roles.role_title AS 'Role', Roles.role_salary AS 'Salary', Departments.department_name AS 'Department' FROM Employees, Roles, Departments WHERE Employees.role_id = Roles.role_id AND Roles.department_id = Departments.department_id AND Employees.manager_id IS NULL ORDER BY ID; ",
    (err, results) => {
      if (err) throw err;
      const mappedEmployees = results.map((employeez) => {
        // console.log(employeez);
        console.log("--------------------------------------------------");
        console.log(`ID: ${employeez.ID}`);
        console.log(`Name: ${employeez.Employee}`);
        console.log(`Manager: ${employeez.Manager}`);
        console.log(`Role: ${employeez.Role}`);
        console.log(`Salary: $${employeez.Salary}`);
        console.log(`Department: ${employeez.Department}`);
        console.log("--------------------------------------------------");
      });
    }
  );
  // console.log("");
  start();
  // console.log("");
}

function seeAllDepartments() {
  connection.query("SELECT * FROM Departments", (err, results) => {
    if (err) throw err;
    results.forEach((depts) => {
      console.log("--------------------------------------------------");
      console.log(`Department ID: ${depts.department_id}`);
      console.log(`Department Name: ${depts.department_name}`);
    });
  });
  start();
}

function seeAllRoles() {
  connection.query(
    "SELECT Roles.role_id, Roles.role_title, Roles.role_salary, Departments.department_name FROM Roles, Departments WHERE Roles.department_id = Departments.department_id;",
    (err, results) => {
      if (err) throw err;
      results.forEach((roles) => {
        console.log("--------------------------------------------------");
        console.log(`Role ID: ${roles.role_id}`);
        console.log(`Role Title: ${roles.role_title}`);
        console.log(`Role Salary: ${roles.role_salary}`);
        console.log(`Role Department: ${roles.department_name}`);
        console.log("--------------------------------------------------");
      });
    }
  );
  start();
}

function selectEmployeeToUpdate() {
  connection.query("SELECT * FROM Employees", (err, results) => {
    if (err) throw err;
    const mappedEmployees = results.map((employeez) => {
      return {
        name: `${employeez.first_name} ${employeez.last_name}`,
        value: employeez.employee_id,
      };
    });
    inquirer
      .prompt([
        {
          name: "employeeToUpdate",
          type: "rawlist",
          message: "What employee needs a Role Update?",
          choices: mappedEmployees,
        },
      ])
      .then((answer) => {
        updateRole(answer);
      });
  });
}

function updateRole(answer) {
  // console.log(answer); // This is the employee_id for the employee that will be updated
  let empIdToUpdate = answer.employeeToUpdate;

  connection.query("SELECT * FROM Roles", (err, results) => {
    if (err) throw err;
    const mappedRoles = results.map((results) => {
      return {
        name: `${results.role_title}`,
        value: `${results.role_id}`,
      };
    });
    inquirer
      .prompt([
        {
          name: "newRole",
          type: "rawlist",
          message: "What is this employee's new role?",
          choices: mappedRoles,
        },
      ])
      .then((response) => {
        let empID = empIdToUpdate;
        let roleID = response.newRole;
        updateRoleInDatabase(empID, roleID);
      });
  });
}

function updateRoleInDatabase(empID, roleID) {
  connection.query("UPDATE Employees SET ? WHERE ?", [
    {
      role_id: roleID,
    },
    {
      employee_id: empID,
    },
  ]);
  console.log("SUCCESSFULLY UPDATED EMPLOYEE ROLE");
  start();
}

function startManagerUpdate() {
  connection.query(
    "SELECT * FROM Employees WHERE manager_id IS NOT NULL",
    (err, results) => {
      if (err) throw err;
      const mappedEmployees = results.map((employeez) => {
        return {
          name: `${employeez.first_name} ${employeez.last_name}`,
          value: employeez.employee_id,
        };
      });
      inquirer
        .prompt([
          {
            name: "employeeManagerUpdate",
            type: "rawlist",
            message: "What employee needs a Manager Update?",
            choices: mappedEmployees,
          },
        ])
        .then((answer) => {
          let empToUpdate = answer.employeeManagerUpdate;
          updateManager(empToUpdate);
        });
    }
  );
}

function updateManager(empToUpdate) {
  let empIdToUpdate = empToUpdate;

  connection.query(
    "SELECT * FROM Employees WHERE manager_id IS NULL",
    (err, results) => {
      if (err) throw err;
      const mappedManager = results.map((results) => {
        return {
          name: `${results.first_name} ${results.last_name}`,
          value: `${results.employee_id}`,
        };
      });
      inquirer
        .prompt([
          {
            name: "newManager",
            type: "rawlist",
            message: "Who is this employee's new manager?",
            choices: mappedManager,
          },
        ])
        .then((response) => {
          let empID = empIdToUpdate;
          let managerID = response.newManager;
          updateManagerInDatabase(empID, managerID);
        });
    }
  );
}

function updateManagerInDatabase(empID, managerID) {
  connection.query("UPDATE Employees SET ? WHERE ?", [
    {
      manager_id: managerID,
    },
    {
      employee_id: empID,
    },
  ]);
  console.log("SUCCESSFULLY UPDATED EMPLOYEE MANAGER");
  start();
}

function startManagerFilter() {
  connection.query(
    "SELECT * FROM Employees WHERE manager_id IS NULL",
    (err, results) => {
      if (err) throw err;
      const mappedManagers = results.map((managerz) => {
        return {
          name: `${managerz.first_name} ${managerz.last_name}`,
          value: managerz.employee_id,
        };
      });
      inquirer
        .prompt([
          {
            name: "managerShowToEmployees",
            type: "rawlist",
            message: "Which manager would you like to see direct reports for?",
            choices: mappedManagers,
          },
        ])
        .then((answer) => {
          let managerToShow = answer.managerShowToEmployees;
          showDirectReports(managerToShow);
        });
    }
  );
}

function showDirectReports(managerToShow) {
  connection.query(
    "SELECT Employees.employee_id, Employees.first_name, Employees.last_name, Roles.role_title, Roles.role_salary, Departments.department_name  FROM Employees, Roles, Departments  WHERE ?  AND Employees.role_id = Roles.role_id  AND Roles.department_id = Departments.department_id;",
    {
      manager_id: managerToShow,
    },
    (err, results) => {
      if (err) throw err;
      results.forEach((results) => {
        console.log(`ID: ${results.employee_id}`);
        console.log(`Name: ${results.first_name} ${results.last_name}`);
        console.log(`Role: ${results.role_title}`);
        console.log(`Salary: ${results.role_salary}`);
        console.log(`Department: ${results.department_name}`);
        console.log(`--------------------------------------------------`);
      });
    }
  );
  start();
}

function deleteDepartment() {
  connection.query("SELECT * FROM Departments", (err, res) => {
    if (err) throw err;
    const mappedDepts = res.map((depts) => {
      return {
        name: depts.department_name,
        value: depts.department_id,
      };
    });
    inquirer
      .prompt([
        {
          name: "deleteDept",
          type: "rawlist",
          message: "Which department would you like to delete?",
          choices: mappedDepts,
        },
      ])
      .then((response) => {
        // console.log(response.deleteDept);
        let deptToDelete = response.deleteDept;
        connection.query("DELETE FROM Departments WHERE ?", [
          {
            department_id: deptToDelete,
          },
        ]);
        console.log("SUCCESSFULLY DELETED THE DEPARTMENT");
        start();
      });
  });
}

function exitProgram() {
  console.log("GOODBYE");
  connection.end();
}

function deleteRole() {
  console.log(`DELETE A ROLE!`);
}

start();
