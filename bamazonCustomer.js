// connect to the database
var mysql = require("mysql");
var inquirer = ("inquirer");
// insert a table

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


connection.query("SELECT * FROM products", function (err, res) {
  if (err) throw err;
  console.log("\n======================\n")
  console.log("WELCOME TO MY ONLINE BUY PORTAL");
  console.log(res);
  console.log("\n======================\n")




  // set the inquirer to prompt the input information

  function showInput() {
    inquirer
      .prompt({

        type: "input",
        message: "What is the Item_id of the product you would like to buy?",
        name: "product",
        filter: Number
      },

        {
          type: "input",
          message: "How many units of this product would you like to buy?",
          name: "quantity",
          filter: Number
        }
      ).then(function (res) {
        var item2 = res.product;
        var quantity2 = res.quantity;
        connection.query("SELECT * FROM products WHERE ?", { item_id: item2 }, function (err, res) {
          if (err) throw err;

          if (Response.length === 0) {
            console.log("ERROR: Select a valid Item ID from the products list.");
            console.log(res);
          } else {
            // response if quantity available in stock
            var productRes = response[0];
            if (quantity2 <= productRes.stock_quantity) {
              console.log("We have sufficient stock....placing your order!");

              // update the inventory
              var updateInventory = "UPDATE products SET stock_quantity = " + (productRes.stock_quantity - quantity2) + "WHERE item_id = " + item2;

              connection.query(updateInventory, function (err, data) {
                if (err) throw err;
                console.log("your order has placed! your total is $" + productRes.price * quantity2);
                console.log("Thank you for shopping! Come Again!");
                console.log("\n===================\n")
                continueShopping();
              })
            } else {
              console.log("sorry!, item's not stock to place order.\n" + "please buy another item.\n");
              continueShopping();
            }
          }
        })
      })
  }
  showInput();
  // ask if they want to continue shopping
  function continueShopping() {
    inquirer.prompt(
      {
        type: "confirm",
        message: "Would you like to continueShopping?",
        name: "conform"
      }
    ).then(function (res) {
      if (res.confirm) {
        console.log("\n======================\n")

        console.log(res);
        console.log("\n======================\n")
      } else {
        console.log("Thank you for shopping!");
        connection.end();
      }
    })
  }
});
