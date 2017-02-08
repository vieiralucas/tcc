const { Router } = require('express');
const jwt = require('express-jwt');

const sessionCtrl = require('./controllers/sessions');
const projectsCtrl = require('./controllers/projects');

const router = new Router();

const ensureAuthenticated = jwt({ secret: 'superSecret' }).unless({ path: ['/api/sessions'] });
router.use(ensureAuthenticated);

router.post('/api/sessions', sessionCtrl.create);

// projects api
router.post('/api/projects', projectsCtrl.create);
router.get('/api/projects', projectsCtrl.list);
router.get('/api/projects/:id', projectsCtrl.get);

module.exports = router;
