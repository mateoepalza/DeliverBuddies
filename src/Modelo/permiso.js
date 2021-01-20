const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const { isLoggedIn } = require('../Modelo/auth');


ruta.get('/',isLoggedIn, control.listPermiso);
ruta.post('/add', isLoggedIn, control.guardarPermiso);
ruta.get('/eliminar/:idPermiso', isLoggedIn, control.eliminarPermiso);
ruta.get('/actualizar/:idPermiso', isLoggedIn, control.actualizarPermiso);
ruta.post('/actualizar/:idPermiso', isLoggedIn, control.confirmarPermiso);


module.exports = ruta;
