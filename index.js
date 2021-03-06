const connection = require("./server");
const inquirer = require("inquirer");

const createDepartment = () => {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "Enter a department name:",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answers.name,
        },
        (err, res) => {
          if (err) throw err;
          console.table(
            "---Added " + answers.name + " to departments table---"
          );
          init();
        }
      );
    });
};

const readDepartments = () => {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    init();
  });
};

const createEmployee = () => {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Enter employee's first name:",
      },
      {
        name: "last_name",
        type: "input",
        message: "Enter employee's last name:",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answers.first_name,
          last_name: answers.last_name,
        },
        (err, res) => {
          if (err) throw err;
          console.table(
            "---Added " +
              answers.first_name +
              " " +
              answers.last_name +
              " to employees table---"
          );
          init();
        }
      );
    });
};

const readEmployees = () => {
  // console.table('Selecting all employees...\n');
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    init();
  });
};

const updateEmpRoles = () => {
  let empList = [];
  connection.query("SELECT * FROM employee", (err, res) => {
    for (let i = 0; i < res.length; i++) {
      empList.push(res[i].first_name + " " + res[i].last_name);
    }
    let roleList = [];
    connection.query("SELECT * FROM role", (err, res) => {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        roleList.push(res[i].title);
      }
      inquirer
        .prompt([
          {
            name: "selectEmp",
            type: "list",
            message: "Choose which employee's role to update.",
            choices: empList,
          },
          {
            name: "selectRole",
            type: "list",
            message: "Choose which role to assign to this employee.",
            choices: roleList,
          },
        ])
        .then((answers) => {
          const lnArr = answers.selectEmp.split(" ");
          connection.query(
            "UPDATE employee SET role_title = ? WHERE last_name = ?",
            [answers.selectRole, lnArr[1]]
          );
          init();
        });
    });
  });
};

const createRole = () => {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Enter role name:",
      },
      {
        name: "salary",
        type: "input",
        message: "Enter role salary:",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answers.title,
          salary: answers.salary,
        },
        (err, res) => {
          if (err) throw err;
          console.table("---Added " + answers.title + " to roles table---");
          init();
        }
      );
    });
};

const readRoles = () => {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.table(res);
    init();
  });
};

const init = () => {
  inquirer
    .prompt([
      {
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "Create a new department",
          "View Departments",
          "Create a new employee",
          "View Employees",
          "Update an employee's role",
          "Create a new role",
          "View roles",
          new inquirer.Separator(),
          "Im done",
          new inquirer.Separator(),
        ],
      },
    ])
    .then((answers) => {
      switch (answers.menu) {
        case "Create a new department":
          createDepartment();
          break;

        case "View Departments":
          readDepartments();
          break;

        case "Create a new role":
          createRole();
          break;

        case "View roles":
          readRoles();
          break;

        case "Create a new employee":
          createEmployee();
          break;

        case "View Employees":
          readEmployees();
          break;

        case "Add/Update a departments roles":
          updateDepartment();
          break;

        case "Update an employee's role":
          updateEmpRoles();
          break;

        default:
          quit();
          break;
      }
    });
};

const quit = () => {
  connection.end();
  console.table("Good bye!");
  process.exit();
};

init();
