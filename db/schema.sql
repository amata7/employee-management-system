DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT PRIMARY KEY auto_increment,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY auto_increment,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  CONSTRAINT fk_department
  FOREIGN KEY (department_id)
  REFERENCES department(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT PRIMARY KEY auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  CONSTRAINT fk_role
  FOREIGN KEY (role_id)
  REFERENCES role(id)
	ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_manager
  FOREIGN KEY (manager_id)
  REFERENCES employee(manager_id)
	ON UPDATE CASCADE
    ON DELETE CASCADE
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;