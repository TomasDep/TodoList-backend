const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, registerUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.get('/', getUsers);

router.post('/', [
  check('name', 'El nombre es requerido').not().isEmpty(),
  check('username', 'El nombre de usuario es requerido').not().isEmpty(),
  check('password', 'La contraseña es requerida').not().isEmpty(),
  check('password', 'La contraseña es invalida').isLength({ min: 5, max: 10}),
  validateFields
], registerUser);

module.exports = router;