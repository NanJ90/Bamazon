var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err){
	if(err) throw err;
	console.log("Those are on SALE!");
	afterConnect();
});

function afterConnect(){
	connection.query("SELECT * FROM products", function(err,response){
		if(err) throw err;
		console.log("afterConnect- this is response.", response);
		promptUserForItemId(response);
	})
}

function promptUserForItemId(response){
	console.log("promptUserForItemId - this is response.", response);
	inquirer.prompt([
	    {
	    	name:"itemId",
	    	message:"Which one you want to buy.Please input the ID(NUMBER ONLY)?",
	    	validate:function(value){
				if(!isNaN(parseInt(value))){
					return true;
				}
				return false;			
				}
			}
	   ]).then(function(data){	  
	   		console.log("this is item-id data:",data); 		
	   		promptUserForItemQuantity(data);
	   		
	   });
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
			console.log("this is user input response: ", response);
	   		getQuantity(response,data);
	});
}

function getQuantity(response,data){
	// console.log("this is item-id data:",data);
	connection.query("SELECT * FROM products WHERE item_id =?",[data.itemId
	],function(err,results){
		if(err) throw err;
		// console.log("this is product's stock: ", results[0].stock_quantity);
		checkQuantity(response,results);
		// console.log("this is user input response: ", response);		
	});
}

function checkQuantity(response,results,data){
	// console.log("checkQuantity userinput quantity: ", response.quantity);
	var availability = results[0].stock_quantity;
		if (availability >= parseInt(response.quantity)){
			promptUserTotal(response,results[0].price);
		}else{				
			console.log("Insufficient quantity");
			afterConnect();
		};
}

function promptUserTotal(data,response,results){
	console.log("this is number of: ", response.quantity, "he/she wants to purchase");	
	connection.query("SELECT * FROM products WHERE item_id =?",[data.itemId
	],function(err,results){	
	 	console.log("Your total is: $" , results[0].price * parseInt(response.quantity));
 	});

 }





