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
app.use('/api/renew', require('./routes/renew'));
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(process.env.PORT || 5000, () => {
  console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});