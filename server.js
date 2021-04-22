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

// const createDepartment = () => {
//   console.log('Inserting a new department...\n');
//   const query = connection.query(
//     'INSERT INTO department SET ?',
//     {
//       id: 2,
//       name: 'Humannnn Resources',
//     },
//     (err, res) => {
//       if (err) throw err;
//     }
//   );
// };

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
      console.log(answers.name);
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

const start = () => {
  inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Create a new department', 'View Departments' , 'Option 3']
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