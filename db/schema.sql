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
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY auto_increment,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT
);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;