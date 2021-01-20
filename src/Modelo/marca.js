const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/',isLoggedIn, control.listMarca);
ruta.post('/add',isLoggedIn, control.guardarMarca);
ruta.get('/eliminar/:idMarca',isLoggedIn, control.eliminarMarca);
ruta.get('/actualizar/:idMarca',isLoggedIn, control.actualizarMarca);
ruta.post('/actualizar/:idMarca',isLoggedIn, control.confirmarMarca);


module.exports = ruta;