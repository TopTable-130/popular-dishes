const fs = require('fs');
const faker = require('faker');
const { argv } = require('yargs');

const lines = argv.lines || 1000000;
const filename = argv.output || 'restaurants.csv';
const writeStream = fs.createWriteStream(filename);
const dishWriteStream = fs.createWriteStream('dishes.csv');

const createRestaurant = () => {
  const name = faker.name.lastName();
  const cuisine = faker.random.word();
  const phone = faker.phone.phoneNumberFormat(1);
  const street = faker.address.streetAddress();
  const city = faker.address.city();
  const state = faker.address.state();
  const zip_code = faker.address.zipCode();

  return `${name},${cuisine},${phone},${street},${city},${state},${zip_code}\n`;
};

const createDish = (restId) => {
  const restaurant_id = restId;
  const name = faker.random.word();
  const description = faker.lorem.sentences(3, 3);

  return `${restaurant_id},${name},${description}\n`;
};

const startWritingRestaurants = (stream, encoding, done) => {
  console.log('Starting to write restaurants...');
  let i = lines;
  function writing() {
    let canWrite = true;
    do {
      i -= 1;
      let post = createRestaurant();
      // check if i === 0 so we would write and call `done`
      if (i === 0) {
        // we are done so fire callback
        stream.write(post, encoding, done);
      } else {
        // we are not done so don't fire callback
        stream.write(post, encoding);
      }
      // else call write and continue looping
    } while (i > 0 && canWrite);
    if (i > 0 && !canWrite) {
      // our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      stream.once('drain', writing);
    }
  }
  writing();
};

const startWritingDishes = (stream, encoding, done) => {
  console.log('Starting to write dishes...');
  let i = 0;
  function writing() {
    let canWrite = true;
    do {
      i += 1;
      if (i % 10 === 0) {
        const percent = Math.floor((i / lines) * 100);
        console.log(`${percent}% complete.`);
      }
      let randomNumber = Math.floor(Math.random() * 5);
      for (let j = 0; j < randomNumber; j++) {
        const dish = createDish(i);
        // check if i === 0 so we would write and call `done`
        if (i === lines) {
          // we are done so fire callback
          stream.write(dish, encoding, done);
        } else {
          // we are not done so don't fire callback
          stream.write(dish, encoding);
        }
      }
      // else call write and continue looping
    } while (i < lines && canWrite);
    if (i < lines && !canWrite) {
      // our buffer for stream filled and need to wait for drain
      // Write some more once it drains.
      stream.once('drain', writing);
    }
  }
  writing();
};

// write our `header` line before we invoke the loop
writeStream.write('name,cuisine,phone,street,city,state,zip_code\n', 'utf-8');
// invoke startWriting and pass callback
startWritingRestaurants(writeStream, 'utf-8', () => {
  writeStream.end();
  dishWriteStream.write('restaurant_id,name,description,\n', 'utf-8');
  startWritingDishes(dishWriteStream, 'utf-8', () => {
    console.log('Finished writing dishes');
    dishWriteStream.end();
  });
});
