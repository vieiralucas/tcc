const Bluebird = require('bluebird');
const mongoose = require('mongoose');

const ActorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Missing name']
  },
  description: {
    type: String
  },
  project: mongoose.Schema.Types.ObjectId
});

const Actor = mongoose.model('Actor', ActorSchema);

module.exports = Actor;
