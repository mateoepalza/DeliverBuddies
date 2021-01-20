const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const  isLoggedIn  = require('../Modelo/auth');


ruta.get('/',control.mainLogIn);
ruta.post('/logIn', control.inicioSesion);
ruta.get('/signUp', control.mainSingUp);
ruta.post('/signUp', control.crearSesion);
ruta.get('/profile');
ruta.get('/logOut', control.cerrarSesion)


module.exports = ruta;
