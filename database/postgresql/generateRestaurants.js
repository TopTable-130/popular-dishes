const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const randomCuisine = () => {
  const cusines = ['italian', 'american', 'chineese', 'japanese', 'canadian'];
  const randomIndex = Math.floor(Math.random() * (cusines.length - 1));
  return cusines[randomIndex];
};

const numberOfRestaurants = 5000000;

const createRestaurants = (numRestaurants) => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('./csv/restaurants.csv'));
  for (let i = 0; i < numRestaurants; i++) {
    if (i % (Math.floor(numRestaurants / 10)) === 0) {
      console.log(`${(i / numRestaurants) * 100}% of restaurants complete`);
    }
    writer.write({
      name: faker.name.lastName(),
      cuisine: randomCuisine(),
      phone: faker.phone.phoneNumberFormat(1),
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      zip_code: faker.address.zipCode(),
    });
  }
  writer.end();
  console.log('Restaurants done.');
};

createRestaurants(numberOfRestaurants);
