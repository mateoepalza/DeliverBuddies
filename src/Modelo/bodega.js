const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/',isLoggedIn, control.listBodega);
ruta.post('/add',isLoggedIn, control.guardarBodega);
ruta.get('/actualizar/:idBodega',isLoggedIn, control.actualizarBodega);
ruta.post('/actualizar/:idBodega',isLoggedIn, control.confirmarBodega);
ruta.get('/eliminar/:idBodega',isLoggedIn, control.eliminarBodega);

module.exports = ruta;
