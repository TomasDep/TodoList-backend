const { Router } = require('express');

const { renewToken } = require('../controllers/auth');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();

router.get('/', validateJwt, renewToken);

module.exports = router;