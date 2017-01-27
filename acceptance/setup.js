process.env.NODE_ENV = process.env.NODE_ENV || 'test';

const { mongo, seed, app } = require('./support');

beforeEach(() => mongo.up()
  .then(() => seed.up())
  .then(() => app.up()));

afterEach(() => app.down()
  .then(() => seed.down())
  .then(() => mongo.down()));

