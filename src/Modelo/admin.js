const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/',isLoggedIn ,control.listInfoAdmin);
ruta.get('/actualizarAdmin/:idAdministrador',isLoggedIn, control.actualizarAdmin);
ruta.post('/actualizarAdmin/:idAdministrador',isLoggedIn, control.confirmarAdmin);

module.exports = ruta;