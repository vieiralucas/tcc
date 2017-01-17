const { Router } = require('express');

const sessionCtrl = require('./controllers/sessions');

const router = new Router();

router.post('/api/sessions', sessionCtrl.create);

module.exports = router;
