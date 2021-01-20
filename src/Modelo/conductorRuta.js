const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const { isLoggedIn } = require('../Modelo/auth');


ruta.get('/',isLoggedIn, control.listConductorR);
ruta.post('/add',isLoggedIn, control.guardarConductorR);
ruta.get('/eliminar/:idConductorRuta',isLoggedIn, control.eliminarConductorR);
ruta.get('/actualizar/:idConductorRuta',isLoggedIn, control.actualizarConductorR);
ruta.post('/actualizar/:idConductorRuta',isLoggedIn, control.confirmarConductorR);

module.exports = ruta;