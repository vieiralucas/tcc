const Bluebird = require('bluebird');

const { Actor, Project } = require('../models');

const create = (req, res) => {
  const actor = new Actor(req.body);
  const { projectId } = req.params;

  return Project.findById(req.params.projectId)
    .then(project => {
      if (project === null) {
        res.status(404).json({ message: `Project ${projectId} not found` });
        return;
      }

      actor.project = projectId;
      return actor.save()
        .then(actor => {
          res.status(201).json(actor);
        })
        .catch({ name: 'ValidationError' }, err => {
          res.status(400).json({ message: err.message });
        })
        .catch(err => {
          res.status(500).json({ message: err.message });
        });
    });
};

const list = (req, res) => {
  const { projectId } = req.params;

  return Project.findById(projectId)
    .then(project => {
      if (!project) {
        res.status(404).json({ message: `Project ${projectId} not found` });
        return;
      }

      return Actor.find({ project: projectId })
        .then(res.json.bind(res))
        .catch(err => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch({ name: 'CastError' }, err => {
      res.status(400).json({ message: `Invalid id ${projectId}` });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

const update = (req, res) => {
  const actorId = req.params.id;

  console.log(req.params)
  console.log(actorId);
  Actor.update({ _id: actorId }, req.body)
    .then(actor => {
      res.json(req.body);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

const remove = (req, res) => {
  const { id } = req.params;

  Actor.remove({ _id: id })
    .then(() => {
      res.status(202).json({ message: `Actor ${id} removed` });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
}

module.exports = {
  create,
  list,
  update,
  remove
};
