const { response } = require('express');
const { validationResult } = require('express-validator');

/**
 * Middleware para verificar si existen errores en los datos ingresados
 */
const validateFields = (req, res = response, next) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: 'Error: Los datos ingresados no son validos',
      errors: errors.mapped()
    });
  }

  next();
}

module.exports = {
  validateFields
}