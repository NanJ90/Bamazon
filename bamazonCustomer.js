var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var userRequired;
var availability;

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});
// connection built 
connection.connect(function(err){
	if(err) throw err;
	startApp();
});
// asking questions for user 
function startApp(){
	console.log("Those are on SALE!\n");
	console.log("\n*******************\n");
	connection.query("SELECT * FROM products", function(err,response){
		console.table(response);
		console.log("\n********************\n");
		if(err) throw err;
	inquirer.prompt([
	    {
	    	name:"itemId",
	    	message:"Which one you want to buy.Please input the ID(NUMBER ONLY)?\n",
	    	validate:function(value){
				if(!isNaN(parseInt(value))){
					return true;
				}
				return false;			
				}
			}
	   ]).then(function(data){	  
	   		// console.log("this is item-id data:",data.itemId); 		
	   		promptUserForItemQuantity(data);
	   		
	   });
	})
}

function promptUserForItemQuantity(data){	
	inquirer.prompt([
		    {
		    	type:"input", 
		    	name:"quantity",
		    	message:"How many would you like to purchase?",
		    	validate:function(value){
					if(!isNaN(parseInt(value))){
						return true;
					}
					return false;			
					}
			}
		]).then(function(response){
			// console.log("this is user input response: ", response);
	   		quantity_Total(response,data);
	});
}

function quantity_Total(response,data){
	// console.log("this is item-id data:",data);
	connection.query("SELECT * FROM products WHERE item_id =?",[data.itemId
	],function(err,results){
		if(err) throw err;
		// console.log("this is product's stock: ", results[0].stock_quantity);
			availability = results[0].stock_quantity;
			userRequired = parseInt(response.quantity);
		if (availability >= userRequired){
			// cusomer total purchased 
			var total = userRequired * results[0].price;
			console.log("Your total is: $",total);
			availability -= userRequired;
			update(data,results,availability);
			startApp();
			// console.log("afterpurchase: ", availability);
			// promptUserTotal(response,results[0].price);
		}else{				
			console.log("Insufficient quantity");
			startApp();
		};
		// console.log("this is user input response: ", response);		
	});
}

function update(data,results,availability){
	console.log("this is item-id data:",data.itemId); 
	// console.log("afterpurchase: ", availability);
	var query = connection.query(
		"UPDATE products SET ? WHERE ?", 
		[
			{
				stock_quantity: availability 
			},
			{
				item_id: data.itemId
			}
		],
		function(err,response){
			if(err) throw err;
			// console.log("availability: ", availability);
			// console.log(response.affectedRows + "updated data");
			// console.log(data.itemId);
	});
};






