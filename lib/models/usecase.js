const Bluebird = require('bluebird');
const mongoose = require('mongoose');

const UsecaseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Missing name']
  },
  description: {
    type: String
  },
  project: mongoose.Schema.Types.ObjectId
});

const Usecase = mongoose.model('Usecase', UsecaseSchema);

module.exports = Usecase;
