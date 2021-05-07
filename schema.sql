
-- Schema stuff ..
DROP DATABASE IF EXISTS company_DB;
CREATE DATABASE company_DB;

USE company_DB;

CREATE TABLE Departments
(
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR (30) NOT NULL,
    PRIMARY KEY (department_id) 
);

CREATE TABLE Roles
(
    role_id INT AUTO_INCREMENT,
    role_title VARCHAR (30) NOT NULL,
    role_salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY(role_id),
    FOREIGN KEY (department_id) REFERENCES Departments(department_id)
);

CREATE TABLE Employees
(
    employee_id INT  AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30) NOT NULL,
    last_name VARCHAR (30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles(role_id),
    FOREIGN KEY (manager_id) REFERENCES Employees(employee_id)
)


-- -- This grabs everything except the employees where manager id is null
-- SELECT emp.employee_id, emp.first_name, emp.last_name, man.first_name, man.last_name, Roles.role_title, Roles.role_salary, Departments.department_name FROM Employees emp, Employees man, Roles, Departments WHERE emp.role_id = Roles.role_id AND Departments.department_id = Roles.department_id AND emp.manager_id = man.employee_id AND emp.employee_id = emp.employee_id; 

-- SELECT Employees.employee_id, Employees.first_name, Employees.last_name, Employees.manager_id, Roles.role_title, Roles.role_salary, Departments.department_name FROM Employees, Roles, Departments WHERE Employees.role_id = Roles.role_id AND Roles.department_id = Departments.department_id;

-- -- -- This selects the Employees from Employees where manager_id is null
-- SELECT * FROM Employees WHERE manager_id IS NULL;

-- Use these two queries to figure out how to combine them
-- SELECT emp.employee_id, emp.first_name, emp.last_name, man.first_name, man.last_name, Roles.role_title, Roles.role_salary, Departments.department_name FROM Employees emp, Employees man, Roles, Departments WHERE emp.role_id = Roles.role_id AND Departments.department_id = Roles.department_id AND emp.manager_id = man.employee_id AND emp.employee_id = emp.employee_id; 

-- SELECT Employees.employee_id, Employees.first_name, Employees.last_name, Employees.manager_id, Roles.role_title, Roles.role_salary, Departments.department_name FROM Employees, Roles, Departments WHERE Employees.role_id = Roles.role_id AND Roles.department_id = Departments.department_id;

-- OJG's Example using an alias
-- SELECT A.first_name AS employees, B.first_name AS managers from Employees A, Employees B WHERE B.manager_id;