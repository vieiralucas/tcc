const Bluebird = require('bluebird');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Missing name']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Missing email']
  },
  projects: [mongoose.Schema.Types.ObjectId],
  password: {
    type: String,
    required: [true, 'Missing password']
  }
});

const User = mongoose.model('User', UserSchema);

const hashPassword = password => new Bluebird((resolve, reject) => {
  bcrypt.hash(password, 10, (err, passwordHashed) => {
    if (err) {
      reject(err);
    }

    resolve(passwordHashed);
  });
});

User.create = data => {
  const user = new User(data);

  return hashPassword(user.password)
    .then(passwordHashed => {
      user.password = passwordHashed;
      return user.save();
    });
};

User.comparePassword = (hashed, toCompare) =>  bcrypt.compareSync(toCompare, hashed);

User.getProfile = user => ({
  _id: user.id,
  name: user.name,
  email: user.email,
  projects: user.projects
});

module.exports = User;
