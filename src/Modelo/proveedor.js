const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/',isLoggedIn, control.listProveedor);
ruta.post('/add',isLoggedIn, control.guardarProveedor);
ruta.get('/eliminar/:idProveedor',isLoggedIn, control.eliminarProveedor);
ruta.get('/actualizar/:idProveedor',isLoggedIn, control.actualizarProveedor);
ruta.post('/actualizar/:idProveedor',isLoggedIn, control.confirmarProveedor);

module.exports = ruta;
