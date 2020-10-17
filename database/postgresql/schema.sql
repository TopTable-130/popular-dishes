DROP DATABASE IF EXISTS top_table;
CREATE DATABASE top_table;

\c top_table;

CREATE TABLE IF NOT EXISTS restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  cuisine VARCHAR(50),
  phone VARCHAR(15),
  street VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip_code VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS dishes (
  id SERIAL PRIMARY KEY,
  restaurant_id INT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50),
  description VARCHAR(255)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(15),
  email VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews(
  id SERIAL PRIMARY KEY,
  dish_id INT NOT NULL REFERENCES dishes(id),
  user_id INT NOT NULL REFERENCES users(id),
  review_text VARCHAR(1000) NOT NULL,
  dined_on DATE,
  rating FLOAT
);
