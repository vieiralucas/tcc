const { Router } = require('express');

const sessionCtrl = require('./controllers/sessions');
const projectsCtrl = require('./controllers/projects');

const router = new Router();

router.post('/api/sessions', sessionCtrl.create);

// projects api
router.post('/api/projects', projectsCtrl.create);
router.get('/api/projects', projectsCtrl.list);
router.get('/api/projects/:id', projectsCtrl.get);

module.exports = router;
