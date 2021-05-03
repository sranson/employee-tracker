
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
    role_title VARCHAR (30) UNIQUE NOT NULL,
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