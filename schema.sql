
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





-- FINALY SEE ALL EMPLOYEES
-- -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
-- SELECT  
-- emp.employee_id AS 'ID', concat(emp.first_name, ' ' ,emp.last_name) AS 'Employee', concat(man.first_name, ' ' ,man.last_name) AS 'Manager', Roles.role_title AS 'Role', Roles.role_salary AS 'Salary', Departments.department_name AS 'Department'  
-- FROM Employees emp, Employees man, Roles, Departments  
-- WHERE emp.role_id = Roles.role_id
-- AND Departments.department_id = Roles.department_id 
-- AND man.employee_id = emp.manager_id
-- UNION 
-- SELECT Employees.employee_id, concat(Employees.first_name, ' ' ,Employees.last_name) AS 'Employee', Employees.manager_id, Roles.role_title AS 'Role', Roles.role_salary AS 'Salary', Departments.department_name AS 'Department'  
-- FROM Employees, Roles, Departments
-- WHERE Employees.role_id = Roles.role_id
-- AND Roles.department_id = Departments.department_id
-- AND Employees.manager_id IS NULL
-- ORDER BY ID;

-- SAME QUERY ON ONE LINE
-- SELECT emp.employee_id AS 'ID', concat(emp.first_name, ' ' ,emp.last_name) AS 'Employee', concat(man.first_name, ' ' ,man.last_name) AS 'Manager', Roles.role_title AS 'Role', Roles.role_salary AS 'Salary', Departments.department_name AS 'Department'   FROM Employees emp, Employees man, Roles, Departments   WHERE emp.role_id = Roles.role_id AND Departments.department_id = Roles.department_id  AND man.employee_id = emp.manager_id UNION  SELECT Employees.employee_id, concat(Employees.first_name, ' ' ,Employees.last_name) AS 'Employee', Employees.manager_id, Roles.role_title AS 'Role', Roles.role_salary AS 'Salary', Departments.department_name AS 'Department'   FROM Employees, Roles, Departments WHERE Employees.role_id = Roles.role_id AND Roles.department_id = Departments.department_id AND Employees.manager_id IS NULL ORDER BY ID;
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



-- QUERY TO UPDATE AN EMPLOYEES ROLE
-- UPDATE Employees SET role_id = 3 WHERE employee_id = 13;

