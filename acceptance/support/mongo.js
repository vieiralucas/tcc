const Bluebird = require('bluebird');
const Mongod = require('mongod');

const server = new Mongod({
  dbpath: './mongodata'
});

const up = () => Bluebird.resolve(server.open())
  .catch({ message: 'Address already in use' }, err => {
    // ignore address already in use error
    return Bluebird.resolve();
  });

const down = () => Bluebird.resolve(server.close());

module.exports = {
  up,
  down
};
