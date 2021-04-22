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
    console.table('---You are listening on PORT 3306---');
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
          console.table('---Added ' + answers.name + ' to departments table---')
          start();
        }
      );
    });
};

const readDepartments = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
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
          console.table('---Added ' + answers.first_name + ' ' + answers.last_name + ' to employees table---');
          start();
        }
      );
    });
};

const readEmployees = () => {
  // console.table('Selecting all employees...\n');
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
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
          console.table('---Added ' + answers.title + ' to roles table---');
          start();
        }
      );
    });
};

const readRoles = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    start();
  });
};

// const updateDepartment = () => {
//   connection.query('SELECT * FROM department', (err, department) => {
//     if (err) throw err;
//     inquirer
//       .prompt([
//         {
//           type: 'list',
//           name: 'dep',
//           message: 'Select a department to add roles to',
//           choices: department.map((dep) => ({
//             value: dep,
//             name: `${dep.id} | ${dep.name}`,
//           })),
//         },
//         // {
//         //   name: 'title',
//         //   type: 'input',
//         //   message: 'Enter a song title:',
//         //   default: (answers) => answers.song.title,
//         // },
//       ])
//       .then((answers) => {
//         console.log(`${department}`);

//         // connection.query(
//         //   'UPDATE department SET ? WHERE ?',
//         //   [
//         //     {
//         //       title: answers.title,
//         //       artist: answers.artist,
//         //       genre: answers.genre,
//         //     },
//         //     {
//         //       department: answers.song.department,
//         //     },
//         //   ],
//         //   (updateError, updateRes) => {
//         //     if (updateError) throw updateError;
//         //     console.log(`${updateRes.affectedRows} products updated!\n`);
//         //     start();
//         //   }
//         // );
//       });
//   });
// };
  
  const start = () => {
    inquirer
    .prompt([
      {
        name: 'menu',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['Create a new department', 'View Departments' , 'Create a new employee', 'View Employees', 'Create a new role', 'View roles', new inquirer.Separator() , 'Im done', new inquirer.Separator()]
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

        case 'Add/Update a departments roles':
          updateDepartment();
          break;

        default:
          quit();
          break;
      }

    });
};

const quit = () => {
  connection.end();
  console.table('Good bye!');
  process.exit();
};