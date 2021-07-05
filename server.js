const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.table("---You are listening on PORT 3306---");
});

module.exports = connection;
