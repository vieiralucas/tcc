const Bluebird = require('bluebird');
const Mongod = require('mongod');

const server = new Mongod({
  dbpath: './mongodata'
});

const up = () => Bluebird.resolve(server.open());

const down = () => Bluebird.resolve(server.close());

module.exports = {
  up,
  down
};
