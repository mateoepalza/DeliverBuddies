const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const { isLoggedIn } = require('../Modelo/auth');


ruta.get('/',isLoggedIn, control.listConductor);
ruta.post('/add',isLoggedIn, control.guardarConductor);
ruta.get('/eliminar/:idConductor' ,isLoggedIn, control.eliminarConductor);
ruta.get('/actualizar/:idConductor',isLoggedIn, control.actualizarConductor);
ruta.post('/actualizar/:idConductor',isLoggedIn, control.confirmarConductor);

module.exports = ruta;