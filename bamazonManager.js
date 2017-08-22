var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  startApp();
});

function startApp(){
	inquirer.prompt([
		{
			type:"list",
			name:"action",
			message:"Choose one of the following options:",
			choices:["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"]
		}
		
	]).then(function(data){ 
		// console.log("this is inquirer data ", data.action);
		switch(data.action){
		case "View Products for Sale":
			onSale();
			break;
		case "View Low Inventory":
			lowStock();
			break;
		case "Add to Inventory":
			addStock();
			break;
		case "Add New Product":
			break;

		}
	});
}

function onSale(){
	connection.query("SELECT * FROM products", function(err,response){
		if(err) throw err;
		console.table("\n******* Those are on SALE! ********","\n",response);
	});

}

function lowStock(){
	connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(err,response){
		if(err) throw err;
		console.table("\n*******T hose are quantity under five! ********","\n",response);
		addStock(response);
	});

}

function addStock(response){
	console.log("addStock response: ", response[0].item_id);
	inquirer.prompt([
		{
			name:"quantity",
			message:"Adding Inventory (Number Only): "
			// validate: function(input){
			// 	if(typeof input !== 'number'){
			// 			return true;
			// 		}
			// 	return false;			
			// 	}
		}
	]).then(function(err,data){
		// undefined Why???
		console.log("this is input quantity AddStockData", data);
		// connection.query("UPDATE products SET ? WHERE ?",
		// 	[
		// 		// stock_quantity:
		// 	]
		// ,function(err,results){

			// });
		});
}


