const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/',isLoggedIn, control.listPedido);
ruta.post('/add',isLoggedIn, control.guardarPedido);
ruta.get('/eliminar/:idPedido',isLoggedIn, control.eliminarPedido);
ruta.get('/actualizar/:idPedido',isLoggedIn, control.actualizarPedido);
ruta.post('/actualizar/:idPedido',isLoggedIn, control.confirmarPedido);
ruta.post('/mas', control.masPedido);
ruta.get('/newAdd',control.newAdd);

module.exports = ruta;
