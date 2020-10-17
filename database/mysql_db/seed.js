/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-console */
// https used for seeding pics, need to run only once
// const https = require('https');
// const fs = require('fs');
const faker = require('faker');
const { db } = require('./index.js');
const dishes = require('./dishes.js');

const dropAll = (seedFn) => {
  db.query('truncate table restaurants;truncate table dishes; truncate table users; truncate table reviews;', seedFn);
};

const loop = (n, sql, param, cb) => {
  const toAdd = [];
  for (let i = 0; i < n; i += 1) {
    toAdd.push([param()]);
  }
  if (cb) {
    db.query(sql, [toAdd], cb);
  } else {
    db.query(sql, [toAdd]);
  }
};

const getDishes = (cb) => {
  const getRestr = 'select (id) from restaurants;';
  db.query(getRestr, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Creating dishes for ${res.length} restaurants`);
    const dishesToInsert = [];
    for (let i = 0; i < res.length; i += 1) {
      const idxGenerated = [];
      const numOfDishes = Math.floor(Math.random() * (12 - 7) + 7);
      for (let dishCount = 0; dishCount < numOfDishes; dishCount += 1) {
        const randomNum = Math.floor(Math.random() * 50);
        if (idxGenerated.indexOf(randomNum) === -1) {
          idxGenerated.push(randomNum);
          const dish = dishes[randomNum];
          dishesToInsert.push([res[i].id, dish.name, dish.ingr, dish.picture]);
        }
      }
    }
    const sql = 'insert into dishes (restr_id, name, ingredients, picture) values ?';
    db.query(sql, [dishesToInsert], cb);
  });
};

const getReviews = () => {
  const getDish = 'select (id) from dishes;';
  db.query(getDish, (err, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Inserting reviews for ${res.length} dishes`);
    const reviewsToInsert = [];
    for (let i = 0; i < res.length; i += 1) {
      const numOfReviews = Math.floor(Math.random() * (13 - 5) + 5);
      var uniqueUserId = [];
      for (let r = 0; r < numOfReviews; r += 1) {
        var user = faker.random.number({ min: 1, max: 50 });
        while (uniqueUserId.indexOf(user) !== -1) {
          user = faker.random.number({ min: 1, max: 50 });
        }
        uniqueUserId.push(user);
        const review = faker.lorem.paragraph(Math.floor(Math.random() * (6 - 4) + 4));
        const dinedOn = faker.date.recent(800);
        const stars = faker.finance.amount(3.5, 5, 1);
        const userStatus = faker.random.boolean();
        reviewsToInsert.push([res[i].id, user, review, dinedOn, stars, userStatus]);
      }
    }
    const sql = 'insert into reviews (dish_id, user_id, review, dined_on, stars, user_status) values ?;';
    db.query(sql, [reviewsToInsert], (error) => {
      if (error) {
        console.log(error);
      }
    });
  });
};

const genUsers = (n) => {
  const sql = 'insert into users (name, avatar) values ?;';
  const name = () => `${faker.name.firstName()} ${faker.name.lastName()}`;
  const params = [];
  for (let i = 0; i < n; i += 1) {
    params.push([name(), `https://avatarstkout.s3-us-west-1.amazonaws.com/${i}.jpg`]);
  }
  db.query(sql, [params]);
};

const genRestaurants = (n, cb) => {
  const sql = 'insert into restaurants (name) values ?;';
  const name = () => `${faker.company.bsBuzz()}`;
  loop(n, sql, name, cb);
};

dropAll((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('success drop all');
    genUsers(50);
    genRestaurants(100, () => {
      console.log('created restaurants');
      getDishes(getReviews);
    });
  }
});

// already called
// const genAvatars = () => {
//   const numImages = 50;

//   for (let i = 0; i < numImages; i += 1) {
//     const file = fs.createWriteStream(`${i}.jpg`);
//     const imgUrl = faker.image.avatar();
//     https.get(imgUrl, (response) => {
//       response.pipe(file);
//     });
//   }
// };
