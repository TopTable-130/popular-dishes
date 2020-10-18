const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const createUsers = () => {
  const writer = csvWriter();
  writer.pipe(fs.createWriteStream('./csv/users.csv'));
  for (let i = 0; i < 8000000; i += 1) {
    if (i % 800000 === 0) {
      console.log(`${(i / 8000000) * 100}% users complete`);
    }
    writer.write({
      id: i,
      username: faker.internet.userName() + (Math.floor(Math.random() * 50)),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      phone: faker.phone.phoneNumberFormat(1),
      email: faker.internet.email(),
    });
  }

  writer.end();
  console.log('Users done.');
};

createUsers();
