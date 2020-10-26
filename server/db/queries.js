const { Pool } = require('pg');
const config = require('../config.js');

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.database,
  port: 5432,
});

//Get all dishes for a restaurant
// const getAllDishesForRestaurant = (req, res) => {
//   const query = `SELECT * FROM dishes WHERE restaurant_id=${req.params.id} LIMIT 10`;
//   //const values = [req.params.id];
//   pool
//     .query(query)
//     .then(({ rows }) => {
//       res.status(200).send(rows);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// };

const getAllDishesForRestaurant = async (req, res) => {
  const query = 'SELECT * FROM dishes WHERE restaurant_id=$1';
  const values = [req.params.id];
  const { rows } = await pool.query(query, values);
  Promise.all(rows.map(async (row) => {
    const reviewQuery = 'SELECT r.id, r.dish_id, u.username, r.review_text, r.dined_on, r.rating AS stars FROM reviews r, users u WHERE r.dish_id=$1 AND r.user_id = u.id';
    const { id } = row;
    const data = await pool.query(reviewQuery, [id]);
    row.reviews = data.rows;
    return new Promise((resolve) => {
      resolve(row);
    });
  }))
    .then((newRows) => {
      res.status(200).send(newRows);
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

const updateDish = (req, res) => {
  const query = 'UPDATE dishes SET name=$2, description=$3 WHERE id=$1;';
  const { name, description } = req.body;
  const values = [req.params.dishId, name, description];
  pool
    .query(query, values)
    .then((data) => {
      res.status(204).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

const deleteDish = (req, res) => {
  const query = 'DELETE FROM dishes WHERE id=$1;';
  const values = [req.params.dishId];
  pool
    .query(query, values)
    .then((data) => {
      res.status(204).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
};

module.exports.getAllDishesForRestaurant = getAllDishesForRestaurant;
module.exports.addDishToRestaurant = addDishToRestaurant;
module.exports.updateDish = updateDish;
module.exports.deleteDish = deleteDish;
