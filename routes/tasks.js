const { Router } = require('express');
const { check } = require('express-validator');

const { getTasks, createTask, updateTask } = require('../controllers/tasks');
const { validateFields } = require('../middlewares/validateFields');
const { validateJwt } = require('../middlewares/validateJwt');

const router = Router();

router.get('/',  validateJwt, getTasks);

router.post('/', [
  validateJwt,
  check('name', 'El nombre de la tarea es requerido').not().isEmpty(),
  validateFields
], createTask);

router.put('/:id', [
  validateJwt,
  check('name', 'El nombre de la tarea es requerido').not().isEmpty(),
  validateFields
], updateTask);

module.exports = router;