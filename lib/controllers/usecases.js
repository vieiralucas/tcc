const Bluebird = require('bluebird');

const { Usecase, Project } = require('../models');

const create = (req, res) => {
  const usecase = new Usecase(req.body);

  return Project.findById(usecase.project)
    .then(project => {
      if (project === null) {
        res.status(400).json({ message: `Project ${usecase.project} does not exist` });
        return;
      }

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

const get = (req, res) => {
  const usecaseId = req.params.id;

  return Usecase.findById(usecaseId)
    .then(usecase => {
      if (!usecase) {
        res.status(404).json({ message: `Usecase ${usecaseId} not found` });
        return;
      }

      res.json(usecase);
    })
    .catch({ name: 'CastError' }, err => {
      res.status(400).json({ message: `Invalid id ${usecaseId}` });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};

const list = (req, res) => Usecase.find()
  .then(res.json.bind(res))
  .catch(err => {
    res.status(500).json({ message: err.message });
  });

module.exports = {
  create,
  get,
  list
};
