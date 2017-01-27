const Bluebird = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./lib/config/config.json');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

mongoose.Promise = Bluebird;
mongoose.connect(`mongodb://localhost/${config[process.env.NODE_ENV].database}`);

const router = require('./lib/router');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(router);
app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.listen(app.get('port'), () => {
  console.log(`Express server running at ${app.get('port')}`);

  // send message to parent process
  if (process.send) {
    process.send({ status: 'listening' });
  }
});

module.exports = app;
