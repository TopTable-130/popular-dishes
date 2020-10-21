const express = require('express');
const queries = require('../db/queries.js');

const router = express.Router();

router.get('/:id/dishes', queries.getAllDishesForRestaurant);

router.post('/:id/dishes', queries.addDishToRestaurant);

router.patch('/:id/dishes/:dishId', (req, res) => {
  // Todo: update a dish
  res.status(204).end();
});

router.delete('/:id/dishes/:dishId', (req, res) => {
  // Todo: delete a dish
  res.status(204).end();
});

module.exports = router;
