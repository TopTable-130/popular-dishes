/* eslint-disable consistent-return */
/* eslint-disable no-console */
const mysql = require('mysql');
const dbConfig = require('./config.js');

const dbConnection = mysql.createConnection(dbConfig);
dbConnection.connect();
// in order for jest test to finish running, if connection is open it has to be closed;
// by having the following function I create the connection only when using

const getAllDishes = (restrId, cb) => {
  const sql = `select * from dishes where restr_id = ${restrId};`;
  dbConnection.query(sql, (err, result) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, result);
  });
};

const getDishReviews = (dishIds, cb) => {
  const sql = `select * from reviews where dish_id in (${dishIds.join(',')});`;
  dbConnection.query(sql, (err, result) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, result);
  });
};

const getUsers = (usersIds, cb) => {
  const sql = `select * from users where id in (${usersIds.join(',')});`;
  dbConnection.query(sql, (err, result) => {
    if (err) {
      cb(err);
      return;
    }
    cb(null, result);
  });
};

module.exports = {
  db: dbConnection,
  getAllDishes,
  getDishReviews,
  getUsers,
};
