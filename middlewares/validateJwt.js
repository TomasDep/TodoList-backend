const jwt = require('jsonwebtoken');

const User = require('../models/user');

/**
 * Middleware para verificar si existe el token en los headers 
 * Como tambien verificar si el token ingresado es correcto
 */
const validateJwt = (req, res, next) => {
  const token = req.header('x-token');
  
  if (!token) {
    return res.status(401).json({
      ok: false,
      message: 'Error: No existe el token en la peticion'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      message: 'El token no es valido'
    });
  }
}

module.exports = {
  validateJwt
}