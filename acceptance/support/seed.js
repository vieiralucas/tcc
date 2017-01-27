const Bluebird = require('bluebird');
const mongoose = require('mongoose');

const config = require('../../lib/config/config.json');

const { User } = require('../../lib/models');

mongoose.Promise = Bluebird;

const up = () => {
  mongoose.connect(`mongodb://localhost/${config[process.env.NODE_ENV].database}`);

  return Bluebird.all([
    User.create({ name: 'admin', email: 'admin@test.com', password: 'admin' })
  ]);
};

const down = () => Bluebird.all([
  User.remove({})
]);

module.exports = {
  up,
  down
};
