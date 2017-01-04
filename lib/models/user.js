const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = require('./sequelize');

const User = sequelize.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1,50]
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
    validate: {
      isEmail: true,
      notEmpty: true,
      len: [1,255]
    }
  },
  passwordDigest: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  password: {
    type: Sequelize.VIRTUAL,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  passwordConfirmation: {
    type: Sequelize.VIRTUAL
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {
  freezeTableName: true,
  indexes: [{unique: true, fields: ['email']}],
  instanceMethods: {
    authenticate: function(value) {
      if (bcrypt.compareSync(value, this.passwordDigest)) {
        return this;
      }

      return false;
    }
  }
});

const hasSecurePassword = (user, options, callback) => {
  if (user.password != user.passwordConfirmation) {
    throw new Error('Password confirmation doesn\'t match Password');
  }

  bcrypt.hash(user.get('password'), 10, function(err, hash) {
    if (err) {
      callback(err);
      return;
    }

    user.set('passwordDigest', hash);
    callback(null, options);
  });
};

User.beforeCreate((user, options, callback) => {
  user.email = user.email.toLowerCase();
  if (user.password) {
    hasSecurePassword(user, options, callback);
    return;
  }

  callback(null, options);
});

User.beforeUpdate((user, options, callback) => {
  user.email = user.email.toLowerCase();
  if (user.password) {
    hasSecurePassword(user, options, callback);
    return;
  }

  callback(null, options);
});

module.exports = User;
