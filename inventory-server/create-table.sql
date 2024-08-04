CREATE TABLE `mjsb-test`.machines (
	`id` INT auto_increment NOT NULL,
	model varchar(100) NOT NULL,
	`timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT machines_pk PRIMARY KEY (`index`)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
