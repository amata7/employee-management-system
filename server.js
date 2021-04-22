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
    start();
  });

const createDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'name',
        type: 'input',
        message: 'Enter a department name:',
      },
    ])
    .then((answers) => {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answers.name,
        },
        (err, res) => {
          if (err) throw err;
          console.log('---Added ' + answers.name + ' to departments table---')
          start();
        }
      );
    });
};

const readDepartments = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    quit();
  });
};

const createEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'first_name',
        type: 'input',
        message: "Enter employee's first name:",
      },
      {
        name: 'last_name',
        type: 'input',
        message: "Enter employee's last name:",
      },
      
    ])
    .then((answers) => {
      connection.query(
        'INSERT INTO employee SET ?',
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
        },
        (err, res) => {
          if (err) throw err;
          console.log('---Added ' + answers.first_name + ' ' + answers.last_name + ' to employees table---');
          start();
        }
      );
    });
};

const readEmployees = () => {
  // console.log('Selecting all employees...\n');
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    quit();
  });
};

const createRole = () => {
  inquirer
    .prompt([
      {
        name: 'title',
        type: 'input',
        message: "Enter role name:",
      },
      {
        name: 'salary',
        type: 'input',
        message: "Enter role salary:",
      },
    ])
    .then((answers) => {
      connection.query(
        'INSERT INTO role SET ?',
        {
          title: answers.title,
          salary: answers.salary,
        },
        (err, res) => {
          if (err) throw err;
          console.log('---Added ' + answers.title + ' to roles table---');
          start();
        }
      );
    });
};

const readRoles = () => {
  // console.log('Selecting all roles...\n');
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    quit();
  });
};

const start = () => {
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Create a new department', 'View Departments' , 'Create a new employee', 'View Employees', 'Create a new role', 'View roles']
      },
    ])
    .then((answers) => {
      
      switch (answers.menu) {

        case 'Create a new department':
          createDepartment();
          break;

        case 'View Departments':
          readDepartments();
          break;

        case 'Create a new role':
          createRole();
          break;

        case 'View roles':
          readRoles();
          break;

        case 'Create a new employee':
          createEmployee();
          break;

        case 'View Employees':
          readEmployees();
          break;


        default:
          quit();
          break;
      }

    });
};

const quit = () => {
  connection.end();
  console.log('Good bye!');
  process.exit();
};