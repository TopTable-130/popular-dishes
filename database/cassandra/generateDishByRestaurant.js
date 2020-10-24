const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const randomCuisine = () => {
  const cusines = ['italian', 'american', 'chineese', 'japanese', 'canadian'];
  const randomIndex = Math.floor(Math.random() * (cusines.length - 1));
  return cusines[randomIndex];
};

const numberOfRestaurants = 5000000;

const createDishes = (numRestaurants) => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('./csv/dishes.csv'));
  let dishCount = 0;
  for (let i = 1; i < numRestaurants; i++) {
    if (i % (Math.floor(numRestaurants / 10)) === 0) {
      console.log(`${(i / numRestaurants) * 100}% of dishes complete`);
    }
    const randomNum = Math.floor(Math.random() * 5);
    for (let j = 0; j < randomNum; j++) {
      writer.write({
        restaurant_id: i,
        restaurant_name: faker.name.lastName(),
        dish_name: randomCuisine(),
        dish_id: dishCount,
        description: faker.lorem.sentences(3, 3),
      });
      dishCount++;
    }
  }

  writer.end();
  console.log(`Dishes complete. ${dishCount} dishes created.`);
};

createDishes(numberOfRestaurants);
