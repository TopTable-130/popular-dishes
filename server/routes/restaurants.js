const express = require('express');
const queries = require('../db/queries.js');

const router = express.Router();

router.get('/:id/dishes', queries.getAllDishesForRestaurant);

router.post('/:id/dishes', queries.addDishToRestaurant);

router.patch('/:id/dishes/:dishId', queries.updateDish);

router.delete('/:id/dishes/:dishId', queries.deleteDish);

module.exports = router;
