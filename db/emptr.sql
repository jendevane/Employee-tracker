DROP DATABASE IF EXISTS emptr;
CREATE DATABASE emptr;

USE emptr;

CREATE TABLE department (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    namee VARCHAR(30)
);
CREATE TABLE rolee (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL (10,2) NOT NULL,
  department_id INTEGER,
  FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR (30),
    last_name VARCHAR (30),
    rolee_id INTEGER,
    manager_id INTEGER,
    FOREIGN KEY (rolee_id) REFERENCES rolee(id),
    FOREIGN KEY (manager_id) REFERENCES rolee(id)

)