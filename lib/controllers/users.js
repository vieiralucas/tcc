const _ = require('lodash');

const { User } = require('../models');

const update = (req, res) => {
  const userId = req.params.id;

  User.update({ _id: req.params.id }, req.body)
    .then(user => {
      res.json(req.body);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  update
};
