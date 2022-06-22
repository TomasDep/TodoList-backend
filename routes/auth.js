const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/', [
  check('name', 'El nombre de usuario es requerido').not().isEmpty(),
  check('password', 'La contraseña es requerida').not().isEmpty(),
  validateFields
], login);

module.exports = router;