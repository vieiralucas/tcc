const jwt = require('jsonwebtoken');

const { User } = require('../models');

const create = (req, res) => {
  return User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        res.status(401).json({ reason: 'User not found' });
        return;
      }

      const rightPassword = User.comparePassword(user.password, req.body.password);

      if (rightPassword) {
        const profile = User.getProfile(user);
        const token = jwt.sign(profile, 'superSecret', {
          expiresIn: '1d' // expires in 1 day
        });

        res.json({
          profile,
          token
        });
        return;
      }

      res.status(401).json({ reason: 'Wrong password' });
    })
    .catch(err => {
      res.status(500).json({ reason: err.message });
    });
};

module.exports = {
  create
};
