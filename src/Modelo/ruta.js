const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/',isLoggedIn, control.listRutas);
ruta.post('/add',isLoggedIn, control.guardarRuta);
ruta.get('/eliminar/:idRuta',isLoggedIn, control.eliminarRuta);
ruta.get('/actualizar/:idRuta',isLoggedIn, control.actualizarRuta);
ruta.post('/actualizar/:idRuta',isLoggedIn, control.confirmarRuta);

module.exports = ruta;
