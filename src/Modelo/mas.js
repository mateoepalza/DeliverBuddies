const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');


/*
 * Elementos del Popup
 */
ruta.post('/cliente', control.masCliente);
ruta.post('/producto', control.masProducto);
ruta.post('/ruta', control.masRuta);
ruta.post('/conductor', control.masConductor);
ruta.post('/planilla', control.masConductorRuta);
/*
 * Elementos ajax del select
 */
 ruta.post('/select/ruta', control.masSelectRuta);
 ruta.post('/select/planilla', control.masSelectPlanilla);
module.exports = ruta;
