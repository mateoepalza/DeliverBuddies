const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/',isLoggedIn,control.list);
ruta.post('/add',isLoggedIn,control.guardar);
ruta.get('/eliminar/:idCliente',isLoggedIn, control.eliminar);
ruta.get('/actualizar/:idCliente',isLoggedIn, control.actualizar);
ruta.post('/actualizar/:idCliente',isLoggedIn, control.confirmar);
ruta.get('/permisos/:idCliente',isLoggedIn, control.permisosCliente);
ruta.post('/permisos/add/:idCliente',isLoggedIn, control.guardarPermisosCliente);
ruta.get('/permisos/eliminar/:idCliente/:idPermiso',isLoggedIn, control.eliminarPermisosCliente);
module.exports = ruta;
