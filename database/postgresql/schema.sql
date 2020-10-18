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
  description VARCHAR(500)
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(15),
  email VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS reviews(
  id SERIAL PRIMARY KEY,
  dish_id INT NOT NULL REFERENCES dishes(id),
  user_id INT NOT NULL REFERENCES users(id),
  review_text VARCHAR(1000) NOT NULL,
  dined_on VARCHAR(100),
  rating FLOAT
);

\COPY restaurants (name, cuisine, phone, street, city, state, zip_code) FROM '/Users/jorgencarlsen/Hack-Reactor/sdc/popular-dishes-service/database/postgresql/csv/restaurants.csv' CSV HEADER;

\COPY users (username, first_name, last_name, phone, email) FROM '/Users/jorgencarlsen/Hack-Reactor/sdc/popular-dishes-service/database/postgresql/csv/users.csv' CSV HEADER;

\COPY dishes (restaurant_id, name, description) FROM '/Users/jorgencarlsen/Hack-Reactor/sdc/popular-dishes-service/database/postgresql/csv/dishes.csv' CSV HEADER;

\COPY reviews (dish_id, user_id, review_text, dined_on, rating) FROM '/Users/jorgencarlsen/Hack-Reactor/sdc/popular-dishes-service/database/postgresql/csv/reviews.csv' CSV HEADER;