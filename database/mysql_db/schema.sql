/* Create  tables and define schemas for them here! */
DROP DATABASE IF EXISTS dishes;
CREATE DATABASE dishes;
USE dishes;

CREATE TABLE restaurants (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  PRIMARY KEY (id)
);


CREATE TABLE dishes (
  id INT NOT NULL AUTO_INCREMENT,
  restr_id INT NOT NULL,
  name VARCHAR(50),
  ingredients VARCHAR(100),
  picture VARCHAR(150),
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50),
  avatar VARCHAR(150),
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL AUTO_INCREMENT,
  dish_id INT NOT NULL,
  user_id INT NOT NULL,
  review VARCHAR(1000),
  dined_on DATE,
  stars FLOAT,
  user_status BOOLEAN,
  PRIMARY KEY (id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u student -p < db/schema.sql
 *  to create the database and the tables.*/