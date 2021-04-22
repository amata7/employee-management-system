const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'password',
  database: 'employee_db',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('---You are listening on PORT 3306---');
  readDepartments();
  readRoles();
  readEmployees();
  createDepartment();
  connection.end();
  });

const readDepartments = () => {
  // console.log('Selecting all departments...\n');
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    
  });
};

const readRoles = () => {
  // console.log('Selecting all roles...\n');
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    
  });
};

const readEmployees = () => {
  // console.log('Selecting all employees...\n');
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    
  });
};

const createDepartment = () => {
  console.log('Inserting a new department...\n');
  const query = connection.query(
    'INSERT INTO department SET ?',
    {
      id: 2,
      name: 'Humannnn Resources',
    },
    (err, res) => {
      if (err) throw err;
    }
  );
};