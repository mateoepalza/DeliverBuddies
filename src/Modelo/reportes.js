const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const {isLoggedIn} = require('../Modelo/auth');

ruta.get('/', isLoggedIn, control.reportes);
ruta.post('/addReporte', isLoggedIn, control.traerReporte);
ruta.get('/PDF/:reporte', isLoggedIn, control.generatePDF);
module.exports = ruta;