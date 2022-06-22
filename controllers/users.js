const bcrypt = require('bcryptjs')

const User = require('../models/usuario');
const generarJWT = require('../helpers/jwt');

/**
 * Metodo para obtener todos los usuarios
 */
const getUsers = async (req, res) => {
  const users = await User.find();

  res.json({
    ok: true,
    message: 'Lista de usuarios',
    users,
  });
}

const registerUser = async (req, res = response) => {
  const { username, password } = req.body;

  try {
    const existEmail = await User.findOne({ username });

    if (existEmail) {
      return res.status(400).json({
        ok: false,
        message: 'El nombre de usuario ya se encuentra registrado'
      });
    }

    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    // Guardar usuario
    await user.save();

    // Generar JWT
    const token = await generarJWT(user.id);
    
    res.json({
      ok: true,
      message: 'Usuario registrado correctamente',
      token,
      usuario
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