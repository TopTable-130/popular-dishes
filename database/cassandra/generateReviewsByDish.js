const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const numberOfDishes = 9996389;

const createReviews = (numDishes) => {
  let reviewCount = 0;
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('./csv/reviews.csv'));
  let i = 0;
  function write() {
    let continueWriting = true;
    do {
      i += 1;
      if (i >= numDishes) {
        if (i % (Math.floor(numDishes / 100)) === 0) {
          console.log(`${Math.floor((i / numDishes) * 100)}% of reviews complete`);
        }
        const randomNum = Math.floor(Math.random() * 5);
        for (let j = 0; j < randomNum; j++) {
          writer.write({
            dish_name: faker.name.lastName(),
            review_id: reviewCount,
            restaurant_name: faker.name.lastName(),
            username: faker.internet.userName() + (Math.floor(Math.random() * 50)),
            dined_on: faker.date.past(5),
            rating: Math.floor(Math.random() * 5),
            review_text: faker.lorem.sentences(3, 3),
          });
          reviewCount += 1;
        }
        console.log('Reviews complete.');
        writer.end();
        break;
      } else {
        if (i % (Math.floor(numDishes / 10)) === 0) {
          console.log(`${Math.floor((i / numDishes) * 100)}% of reviews complete`);
        }
        const randomNum = Math.floor(Math.random() * 5);
        for (let j = 0; j < randomNum; j++) {
          continueWriting = writer.write({
            dish_name: faker.name.lastName(),
            review_id: reviewCount,
            restaurant_name: faker.name.lastName(),
            username: faker.internet.userName() + (Math.floor(Math.random() * 50)),
            dined_on: faker.date.past(5),
            rating: Math.floor(Math.random() * 5),
            review_text: faker.lorem.sentences(3, 3),
          });
          reviewCount += 1;
        }
      }
    } while (i < numDishes && continueWriting);
    if (i < numDishes) {
      writer.once('drain', write);
    }
  }
  write();
};

createReviews(numberOfDishes);
