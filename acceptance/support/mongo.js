const Mongod = require('mongod');

const server = new Mongod({
  dbpath: './mongodata'
});

const up = () => server.open();

const down = () => server.close();

module.exports = {
  up,
  down
};
