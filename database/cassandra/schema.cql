DROP KEYSPACE IF EXISTS toptable;

CREATE KEYSPACE IF NOT EXISTS toptable
  WITH replication = {
    'class': 'SimpleStrategy',
    'replication_factor': 1
  };

USE toptable;

CREATE TABLE IF NOT EXISTS users (
  id uuid,
  username text,
  first_name text,
  last_name text,
  phone text,
  email text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS restaurants (
  id UUID,
  name text,
  cuisine text,
  street text,
  city text,
  state text,
  zip_code int,
  phone text,
  email text,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS dish_by_restaurant (
  restaurant_name text,
  dish_name text,
  dish_id int,
  description text,
  price int,
  PRIMARY KEY (restaurant_name, dish_id)
);

CREATE TABLE IF NOT EXISTS reviews_by_dish (
  dish_name text,
  review_id UUID,
  restaurant_name text,
  username text,
  user_id UUID,
  dined_on date,
  rating smallint,
  review_text text,
  PRIMARY KEY (dish_name, review_id, dined_on)
)
WITH CLUSTERING ORDER BY

