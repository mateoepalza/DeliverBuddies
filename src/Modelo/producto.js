const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/',isLoggedIn, control.listProducto);
ruta.post('/add',isLoggedIn, control.guardarProducto);
ruta.get('/eliminar/:idProducto',isLoggedIn, control.eliminarProducto);
ruta.get('/actualizar/:idProducto',isLoggedIn, control.actualizarProducto);
ruta.post('/actualizar/:idProducto',isLoggedIn, control.confirmarProducto);

module.exports = ruta;