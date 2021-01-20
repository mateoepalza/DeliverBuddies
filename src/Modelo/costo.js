const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const { isLoggedIn } = require('../Modelo/auth');

ruta.get('/',isLoggedIn, control.listCostos);
ruta.post('/add',isLoggedIn, control.guardarCosto);
ruta.get('/eliminar/:idCosto',isLoggedIn, control.eliminarCosto);
ruta.get('/actualizar/:idCosto',isLoggedIn, control.actualizarCosto);
ruta.post('/actualizar/:idCosto',isLoggedIn, control.confirmarCosto);


module.exports=ruta;