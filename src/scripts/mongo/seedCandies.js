// DEBUG=app:* node src/scripts/mongo/seedCandies.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:candies');
const MongoLib = require('../../lib/mongo');
const { candiesMock } = require('../../utils/mocks');

async function seedCandies() {
  try {
    const mongoDB = new MongoLib();

    const promises = candiesMock.map(async candy => {
      await mongoDB.create('candies', candy);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} candies have been created succesfully`)); // prettier-ignore
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedCandies();
