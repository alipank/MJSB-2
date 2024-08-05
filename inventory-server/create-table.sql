CREATE TABLE machines (
	machines_id INT PRIMARY KEY AUTO_INCREMENT,
	brand varchar(20),
	model varchar(30),
	note varchar(200),
	FOREIGN KEY(brand) REFERENCES brand(name)
);

CREATE TABLE brand (
	brand_id INT PRIMARY KEY,
	name varchar(20) UNIQUE KEY
);