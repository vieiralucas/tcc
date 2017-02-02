const Bluebird = require('bluebird');
const mongoose = require('mongoose');

const config = require('../../lib/config/config.json');

const { User, Project } = require('../../lib/models');

mongoose.Promise = Bluebird;

const up = () => {
  if (!mongoose.connection.readyState) {
    mongoose.connect(`mongodb://localhost/${config[process.env.NODE_ENV].database}`);
  }

  return Bluebird.all([
    User.create({ name: 'admin', email: 'admin@test.com', password: 'admin', projects: [] }),
    Project.create({ name: 'tcc', description: 'Final project' })
  ]);
};

const down = () => {
  if (!mongoose.connection.readyState) {
    mongoose.connect(`mongodb://localhost/${config[process.env.NODE_ENV].database}`);
  }

  return Bluebird.all([
    User.remove({}),
    Project.remove({})
  ]);
};

module.exports = {
  up,
  down
};
