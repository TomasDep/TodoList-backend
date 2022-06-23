const jwt = require('jsonwebtoken');
/**
 * Helper para Generar un JWT
 * @param uid 
 * @returns token
 */
const generateJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = { uid };
    
    jwt.sign(
      payload, 
      process.env.JWT_SECRET, 
      { 
        expiresIn: '8h' 
      }, 
      (error, token) => {
        if (error) {
          console.log(error);
          reject('Error: No se pudo generar el JWT');
        } else {
          resolve(token);
        }
    });
  });
}

module.exports = {
  generateJWT
}