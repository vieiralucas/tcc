const jwt = require('jsonwebtoken');

const mongo = require('./mongo');
const seed = require('./seed');
const app = require('./app');

module.exports = {
  mongo,
  seed,
  app,
  token: jwt.sign({ name: 'name', email: 'email@email.com' }, 'superSecret', {
    expiresIn: '1d' // expires in 1 day
  })
};
