CREATE TABLE machines (
	machines_id INT PRIMARY KEY AUTO_INCREMENT,
	brand varchar(20),
	model varchar(30),
	note varchar(200),
	FOREIGN KEY(brand) REFERENCES brand(name)
);
