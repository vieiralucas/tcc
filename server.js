const Bluebird = require('bluebird');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = Bluebird;
mongoose.connect('mongodb://localhost/tcc-development');

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
});

