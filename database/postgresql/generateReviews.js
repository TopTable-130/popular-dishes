const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const numberOfDishes = 10000064;
const numberOfUsers = 8000000;

const createReviews = (numDishes, numUsers) => {
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
          let userId = Math.floor(Math.random() * numUsers - 1) + 1;
          if (userId === 0) userId = 1;
          writer.write({
            dish_id: i,
            user_id: userId,
            review_text: faker.lorem.sentences(3, 3),
            dined_on: faker.date.past(5),
            rating: Math.floor(Math.random() * 5),
          });
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
          let userId = Math.floor(Math.random() * numUsers - 1) + 1;
          if (userId === 0) userId = 1;
          continueWriting = writer.write({
            dish_id: i,
            user_id: userId,
            review_text: faker.lorem.sentences(3, 3),
            dined_on: faker.date.past(5),
            rating: Math.floor(Math.random() * 5),
          });
        }
      }
    } while (i < numDishes && continueWriting);
    if (i < numDishes) {
      writer.once('drain', write);
    }
  }

  // for (let i = 1; i < numDishes; i++) {
  //   const randomNum = Math.floor(Math.random() * 7);
  //   if (i % (Math.floor(numDishes / 10)) === 0) {
  //     console.log(`${(i / numDishes) * 100}% of reviews complete`);
  //   }
  //   for (let j = 0; j < randomNum; j++) {
  //     let userId = Math.floor(Math.random() * numUsers - 1) + 1;
  //     if (userId === 0) userId = 1;
  //     writer.write({
  //       dish_id: i,
  //       user_id: userId,
  //       review_text: faker.lorem.sentences(3, 3),
  //       dined_on: faker.date.past(5),
  //       rating: Math.floor(Math.random() * 5),
  //     });
  //   }
  // }

  write();
  //writer.end();
  //console.log('Reviews complete.');
};

createReviews(numberOfDishes, numberOfUsers);
