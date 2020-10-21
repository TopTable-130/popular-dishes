const { Pool } = require('pg');
const config = require('../config.js');

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.database,
  port: 5432,
});

// Get all dishes for a restaurant
const getAllDishesForRestaurant = (req, res) => {
  const query = 'SELECT * FROM dishes WHERE restaurant_id=$1';
  const values = [req.params.id];
  pool
    .query(query, values)
    .then(({ rows }) => {
      res.status(200).send(rows);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

// Get all dishes for a restaurant
const addDishToRestaurant = (req, res) => {
  const query = 'INSERT INTO dishes (restaurant_id, name, description) VALUES ($1, $2, $3);';
  const { name, description } = req.body;
  const values = [req.params.id, name, description];
  pool
    .query(query, values)
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.getAllDishesForRestaurant = getAllDishesForRestaurant;
module.exports.addDishToRestaurant = addDishToRestaurant;
