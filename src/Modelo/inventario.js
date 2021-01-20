const express = require('express');
const inventario = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

inventario.get('/' ,isLoggedIn, control.listInventario);
inventario.get('/eliminar/:idInventario' ,isLoggedIn, control.eliminarInventario);
inventario.get('/actualizar/:idInventario' ,isLoggedIn, control.actualizarInventario);
inventario.post('/actualizar/:idInventario' ,isLoggedIn, control.confirmarInventario);

module.exports = inventario
