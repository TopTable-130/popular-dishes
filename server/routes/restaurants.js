const express = require('express');

const router = express.Router();

router.get('/:id/dishes', (req, res) => {
  // Todo: send back all the dishes for a restaurant
  res.status(200).send('Getting all dishes...');
});

router.post('/:id/dishes', (req, res) => {
  // Todo: create a new dish in the db
  res.status(201).send('Adding a dish...');
});

router.patch('/:id/dishes/:dishId', (req, res) => {
  // Todo: update a dish
  res.status(204).end();
});

router.delete('/:id/dishes/:dishId', (req, res) => {
  // Todo: delete a dish
  res.status(204).end();
});

module.exports = router;
