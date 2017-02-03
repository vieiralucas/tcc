process.env.NODE_ENV = process.env.NODE_ENV || 'test';
process.env.PORT = process.env.PORT || 3002;

const { mongo, seed, app } = require('./support');

before(() => mongo.up()
  .then(() => app.up()));

beforeEach(seed.up);


after(() => app.down()
  .then(() => mongo.down()));

afterEach(seed.down);

