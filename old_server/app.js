/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/../client/dist')));

// single api call to get all the data about dishes reviews and users of a particular restaurant
app.get('/api/dishes/restaurant/:id', (req, res) => {
  const finalResponse = {};
  db.getAllDishes(req.params.id, (err, data) => {
    if (err) {
      console.log(err.sqlMessage);
      res.end('Error quering the database');
    } else {
      if (!data.length) {
        res.status(422).send('invalid restaurand id');
        return;
      }
      finalResponse.dishes = {};
      finalResponse.users = {};
      const dishIdArray = [];
      const usersIdArray = [];
      // loop over data, to fill dishes property on finalResponse obj
      for (const d in data) {
        const dish = data[d];
        finalResponse.dishes[dish.id] = dish;
        // create a property where reviews will be stored
        dish.reviews = {};
        dishIdArray.push(dish.id);
      }
      db.getDishReviews(dishIdArray, (errReviews, dataReviews) => {
        if (errReviews) {
          console.log(errReviews.sqlMessage);
          res.end('Error quering from the database');
        } else {
          // loop over reviwes data and add a review to reviews property on every dish object
          for (const r in dataReviews) {
            const review = dataReviews[r];
            usersIdArray.push(review.user_id);
            finalResponse.dishes[review.dish_id].reviews[review.id] = review;
          }
          // get Users once usersIdArray is available
          db.getUsers(usersIdArray, (errUsers, dataUsers) => {
            if (errUsers) {
              console.log(errReviews.sqlMessage);
              res.end('Error quering from the database');
            } else {
              for (const u in dataUsers) {
                const user = dataUsers[u];
                finalResponse.users[user.id] = user;
              }
              res.status(200).send(finalResponse);
            }
          });
        }
      });
    }
  });
});

module.exports = app;
