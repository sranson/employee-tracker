  SELECT * FROM Departments;
  
  -- -- Seeding data..
  INSERT INTO Departments 
    (department_name)
  VALUES('Sales'), ('Marketing'), ('Engineering'), ('Finance'), ('Legal') ;

-- This creates SALES MANAGER for the Sales department
INSERT INTO Roles
  (role_title, role_salary, department_id)
VALUES ('Salesperson', 70000, 1), ('Graphic Designer', 65000, 2), ('Lead Engineer', 120000, 3), ('Software Engineer', 100000, 3), ('Business Analyst', 80000, 4), ('Quality Analyst', 80000, 4), ('Attorney', 90000, 5), ('Paralegal', 45000, 5);




INSERT INTO Employees
  (first_name, last_name, role_id)
VALUES
('Amanda', 'Bradley', 1),
('Salome', 'Ranson', 2), 
('Wayne', 'Ranson', 3), 
('John', 'Smith', 4), 
('William', 'Williams', 5);


-- This adds to the employee table  ---> Dept: Sales
INSERT INTO Employees
  (first_name, last_name, role_id, manager_id)
VALUES 
('Meredith', 'Grey', 3, 1),
('Jane', 'Doe', 4, 2),
('Michael', 'Jordan', 4, 3),
('Chris', 'Brown', 5, 4),
('Ashley', 'Louis', 5, 5),
('Sarah', 'Lourd', 1, 1),
('Tom', 'Allen', 2, 2);

