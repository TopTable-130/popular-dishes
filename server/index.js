const path = require('path');
const express = require('express');
const restaurants = require('./routes/restaurants.js');

const app = express();
const port = 3001;

// serve static
app.use(express.static(path.join(__dirname, '/../client/dist')));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/restaurants', restaurants);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
