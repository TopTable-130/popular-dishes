require('newrelic');
const path = require('path');
const express = require('express');
const { Pool } = require('pg');
const config = require('./config.js');

const pool = new Pool({
  user: config.dbUser,
  host: config.dbHost,
  database: config.database,
  port: 5432,
});

const app = express();
const port = 3001;

// serve static
app.use(express.static(path.join(__dirname, '/../client/dist')));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/restaurants/:id/dishes', async (req, res) => {
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
});

app.post('/api/restaurants/:id/dishes', (req, res) => {
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
});

app.patch('/api/restaurants/:id/dishes/:dishid', (req, res) => {
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
});

app.delete('/api/restaurants/:id/dishes/:dishid', (req, res) => {
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
});

// Connect to server
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
