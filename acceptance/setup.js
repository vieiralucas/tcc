const { mongo, seed, app } = require('./support');

process.env.NODE_ENV = process.env.NODE_ENV || 'test';

before(() => mongo.up()
  .then(() => app.up()));

beforeEach(seed.up);

after(() => app.down()
  .then(() => mongo.down()));

afterEach(seed.down);

