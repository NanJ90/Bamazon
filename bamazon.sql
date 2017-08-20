
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	item_id INTEGER AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) ,
    department_name VARCHAR(100),
    price INTEGER,
    stock_quantity INTEGER,
	PRIMARY KEY (item_id)
    )

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("paper", "grocery", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("sugar", "food", 2.7, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("lipstick", "beauty", 4.34, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("wipers", "grocery", 5, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("foundation", "beauty", 12.89, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("brush", "beauty", 5.7, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("primer", "beauty", 1.2, 344);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eyeliner", "beauty", 2, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computer", "electronic", 3000, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("pencil", "office", 0.7, 2000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("eraser", "office", 2, 0);

SELECT * FROM products
DESCRIBE products