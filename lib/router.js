const { Router } = require('express');
const jwt = require('express-jwt');

const sessionCtrl = require('./controllers/sessions');
const projectsCtrl = require('./controllers/projects');
const usecasesCtrl = require('./controllers/usecases');
const usersCtrl = require('./controllers/users');

const router = new Router();

const ensureAuthenticated = jwt({ secret: 'superSecret' }).unless({ path: ['/api/sessions'] });
router.use(ensureAuthenticated);
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ reason: err.message });
    return;
  }

  next();
});

router.post('/api/sessions', sessionCtrl.create);

// projects api
router.post('/api/projects', projectsCtrl.create);
router.get('/api/projects', projectsCtrl.list);
router.get('/api/projects/:id', projectsCtrl.get);

// usecases api
router.post('/api/projects/:projectId/usecases', usecasesCtrl.create);

// user api
router.put('/api/users/:id', usersCtrl.update);

module.exports = router;
