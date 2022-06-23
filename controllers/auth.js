const { response } = require('express');
const bcrypt = require('bcryptjs')

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

/**
 * Metodo para el inicio de sesion
 */
const login = async (req, res = response) => {
  const { username, password } = req.body;

  try {
    /**
     * Verificar si existe el username
     */
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Las credenciales no son validas'
      });
    }

    /**
     * Verificar si existe la contraseña
     */
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        message: 'Las credenciales no son validas'
      });
    }

    /**
     * Generar el JWT 
     */ 
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      token,
      message: 'Usuario autenticado',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Error: No se pudo realizar el login... revisar los logs'
    });
  }
}

/**
 * Metodo para verificar y renovar token
 */
const renewToken = async (req, res = response) => {
  const uid = req.uid;
  
  /**
    * Generar el JWT 
    */ 
  const token = await generateJWT(uid);
  const user = await User.findById(uid);

  res.json({
    ok: true,
    message: 'El token ha sido renovado',
    token,
    user,
  });
}

module.exports = {
  login,
  renewToken
}