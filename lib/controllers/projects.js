const Bluebird = require('bluebird');
const mongoose = require('mongoose');

const { User, Project } = require('../models');

const create = (req, res) => {
  const project = new Project(req.body);

  project.save()
    .then(project => {
      res.status(201).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

const get = (req, res) => {
  const projectId = req.params.id;

  Project.findById(projectId)
    .then(project => {
      if (!project) {
        res.status(404).json({ message: `Project ${projectId} not found` });
        return;
      }

      res.json(project);
    })
    .catch({ name: 'CastError' }, err => {
      res.status(400).json({ message: `Invalid id ${projectId}` });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

const listByUser = email => User.findOne({ email })
  .then(user => {
    if (!user) {
      return null;
    }

    return Bluebird.map(user.projects, projectId => Project.findById(projectId));
  });

const list = (req, res) => {
  if (req.query.user) {
    listByUser(req.query.user)
      .then(projects => {
        if (!projects) {
          res.status(404).json({ message: `User ${req.query.user} not found` });
          return;
        }

        res.json(projects);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });

    return;
  }

  Project.find()
    .then(res.json.bind(res))
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

module.exports = {
  create,
  get,
  list
};
