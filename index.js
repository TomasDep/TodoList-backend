require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

const app = express();

app.use(cors());
app.use(express.json());
dbConnection();

/**
 * Rutas
 */
app.use('/api/login', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(process.env.PORT, () => {
  console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});