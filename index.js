const express = require('express');
const path = require('path');
require('dotenv').config();

// App de Express
const app = express();

// Lectura y parseo del Body
app.use(express.json());

// Node Server
const server = require('http').createServer(app);

// Path público
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));


//Mis rutas
app.use('/api/notification', require('./routes/notification'));
app.use('/api/view', require('./routes/view'));
app.use('/api/app', require('./routes/app'));

server.listen(process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT);

});


