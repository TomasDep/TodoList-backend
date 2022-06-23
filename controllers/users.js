const bcrypt = require('bcryptjs')

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

/**
 * Metodo para obtener todos los usuarios
 */
const getUsers = async (req, res) => {
  /**
   * Crear una lista de todos los usuarios registrados
   */
  const users = await User.find();

  res.json({
    ok: true,
    message: 'Lista de usuarios',
    users,
  });
}

/**
 * 
 * Metodo para registrar un usuario
 */
const registerUser = async (req, res = response) => {
  const { username, password } = req.body;

  try {
    const existUsername = await User.findOne({ username });

    if (existUsername) {
      return res.status(400).json({
        ok: false,
        message: 'El nombre de usuario ya se encuentra registrado'
      });
    }

    const user = new User(req.body);

    /**
     * Encriptar la contraseña
     */
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    /**
     * Guardar el usuario en la Base de datos
     */
    await user.save();

    /**
     * Generar el JWT
     */
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      message: 'Usuario registrado correctamente',
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Error: No se pudo registrar el usuario en la base de datos... revisar los logs'
    });
  }
}

module.exports = {
  getUsers,
  registerUser
}