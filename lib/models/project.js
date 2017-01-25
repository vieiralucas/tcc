const Bluebird = require('bluebird');
const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Missing name']
  },
  description: {
    type: String
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
