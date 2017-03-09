const Bluebird = require('bluebird');

const { Usecase, Project } = require('../models');

const create = (req, res) => {
  const usecase = new Usecase(req.body);
  const { projectId } = req.params;

  return Project.findById(req.params.projectId)
    .then(project => {
      if (project === null) {
        res.status(404).json({ message: `Project ${projectId} not found` });
        return;
      }

      usecase.project = projectId;
      return usecase.save()
        .then(usecase => {
          res.status(201).json(usecase);
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

      return Usecase.find({ project: projectId })
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
  const usecaseId = req.params.id;

  Usecase.update({ _id: usecaseId}, req.body)
    .then(usecase => {
      res.json(req.body);
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

const remove = (req, res) => {
  const { id } = req.params;

  Usecase.remove({ _id: id })
    .then(() => {
      res.status(202).json({ message: `Usecase ${id} removed` });
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
