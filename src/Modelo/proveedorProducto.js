const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/',isLoggedIn, control.listProveedorProduc);
ruta.post('/add',isLoggedIn, control.guardarProveedorProducto);
ruta.get('/eliminar/:idProveedorProductor',isLoggedIn, control.eliminarProveedorProducto);
ruta.get('/actualizar/:idProveedorProducto',isLoggedIn, control.actualizarproveedorProducto);
ruta.post('/actualizar/:idProveedorProducto',isLoggedIn, control.confirmarProveedorProducto);

module.exports = ruta;