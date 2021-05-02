  SELECT * FROM Departments;
  
  -- -- Seeding data..
  INSERT INTO Departments 
    (department_name)
  VALUES('Sales');

  INSERT INTO Departments 
    (department_name)
  VALUES('Marketing');

-- This creates type: MANAGER for the Sales department
INSERT INTO Roles
  (role_title, role_salary, department_id)
VALUES('Manager', 90000, 1);


-- This creates type: EMPLOYEE for the Sales department
INSERT INTO Roles
  (role_title, role_salary, department_id)
VALUES('Employee', 70000, 1);


-- This adds to the employee table  ---> role: Manager ---> Dept: Sales
INSERT INTO Employees
  (first_name, last_name, role_id)
VALUES('Amanda', 'Bradley', 1);


-- This adds to the employee table  ---> role: EMPLOYEE ---> Dept: Sales
INSERT INTO Employees
  (first_name, last_name, role_id)
VALUES('Salome', 'Ranson', 2);

