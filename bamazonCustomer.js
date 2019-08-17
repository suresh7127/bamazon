// connect to the database
var mysql = require("mysql");
var inquirer = ("inquirer");
// insert a table
var Table = require("cli-table2");
// create connection
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Ghar@309",
  database: "bamazone_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});