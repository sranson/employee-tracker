  SELECT * FROM Departments;
  
  -- -- Seeding data..
  INSERT INTO Departments 
    (department_name)
  VALUES('Sales');

  INSERT INTO Departments 
    (department_name)
  VALUES('Marketing');

    INSERT INTO Departments 
    (department_name)
  VALUES('Engineering');

-- This creates SALES MANAGER for the Sales department
INSERT INTO Roles
  (role_title, role_salary, department_id)
VALUES('Sales Manager', 90000, 1);


-- This creates Salesperson for the Sales department
INSERT INTO Roles
  (role_title, role_salary, department_id)
VALUES('Salesperson', 70000, 1);

-- This creates Lead Engineer for the Engineering department
INSERT INTO Roles
  (role_title, role_salary, department_id)
VALUES('Lead Engineer', 120000, 3);

-- This creates Software Engineer for the Engineering department
INSERT INTO Roles
  (role_title, role_salary, department_id)
VALUES('Software Engineer', 100000, 3);


-- This adds to the employee table  ---> Dept: Sales
INSERT INTO Employees
  (first_name, last_name, role_id)
VALUES('Amanda', 'Bradley', 1);


-- This adds to the employee table  ---> Dept: Sales
INSERT INTO Employees
  (first_name, last_name, role_id)
VALUES('Salome', 'Ranson', 2);

