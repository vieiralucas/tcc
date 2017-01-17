const jwt = require('jsonwebtoken');

const User = require('../models/user');

const create = (req, res) => {
  console.log(req.body);
  return User.findById(req.body.email)
    .then(user => {
      const rightPassword = user.authenticate(req.body.password);

      if (rightPassword) {
        const profile = user.profile();
        const token = jwt.sign(profile, 'superSecret', {
          expiresIn: '1d' // expires in 1 day
        });

        console.log(user.profile());
        res.json({
          profile,
          token
        });
        return;
      }

      res.status(401).json({ reason: 'Wrong password' });
    })
    .catch(err => {
      res.status(401).json({ reason: 'User not found' });
    });
};

module.exports = {
  create
};
