DROP KEYSPACE IF EXISTS toptable;

CREATE KEYSPACE IF NOT EXISTS toptable
  WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
  };

USE toptable;

CREATE TABLE IF NOT EXISTS users (
  id int,
  username text,
  first_name text,
  last_name text,
  phone text,
  email text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS restaurants (
  id int,
  name text,
  cuisine text,
  street text,
  city text,
  state text,
  zip_code text,
  phone text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dish_by_restaurant (
  restaurant_id int,
  restaurant_name text,
  dish_name text,
  dish_id int,
  description text,
  PRIMARY KEY (restaurant_id, restaurant_name, dish_id)
);

CREATE TABLE IF NOT EXISTS reviews_by_dish (
  dish_id int,
  dish_name text,
  review_id int,
  restaurant_name text,
  username text,
  dined_on text,
  rating smallint,
  review_text text,
  PRIMARY KEY (dish_id, dined_on)
)
WITH CLUSTERING ORDER BY (dined_on DESC);

COPY users (id, username, first_name, last_name, phone, email) FROM '/Users/jorgencarlsen/Hack-Reactor/sdc/popular-dishes-service/database/cassandra/csv/users.csv' with header=true and delimiter =',';

COPY restaurants (id, name, cuisine, street, city, state, zip_code, phone) FROM '/Users/jorgencarlsen/Hack-Reactor/sdc/popular-dishes-service/database/cassandra/csv/restaurants.csv' with header=true and delimiter =',';

COPY dish_by_restaurant (restaurant_id, restaurant_name, dish_name, dish_id, description) FROM '/Users/jorgencarlsen/Hack-Reactor/sdc/popular-dishes-service/database/cassandra/csv/dishes.csv' with header=true and delimiter =',';

COPY reviews_by_dish (dish_id, dish_name, review_id, restaurant_name, username, dined_on, rating, review_text) FROM '/Users/jorgencarlsen/Hack-Reactor/sdc/popular-dishes-service/database/cassandra/csv/reviews.csv' with header=true and delimiter =',';