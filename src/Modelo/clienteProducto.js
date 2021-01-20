const express = require('express');
const ruta = express.Router();
const control = require('../Control/controlador');
const { isLoggedAsClient } = require('../Modelo/auth');


ruta.get('/', isLoggedAsClient, control.mainProducts);
ruta.get('/getProducts', isLoggedAsClient, control.selectProducts);
ruta.get('/getAllProducts', isLoggedAsClient, control.selectAllProducts);
ruta.get('/getProduct', isLoggedAsClient,  control.selectProduct);
ruta.get('/getSearchProducts', isLoggedAsClient,  control.selectSearchProducts);
ruta.get('/getSearchProductsMarca', isLoggedAsClient,  control.selectSearchProductsMarca);
ruta.get('/deleteProduct', isLoggedAsClient, control.deleteProduct);
ruta.get('/updateCantProduct', isLoggedAsClient, control.updateCantProduct);
ruta.get('/updatePrice', isLoggedAsClient, control.updatePrice);
ruta.get('/checkOut', isLoggedAsClient, control.checkOut);
ruta.post('/compra', isLoggedAsClient, control.compra);
ruta.get('/actualizar', isLoggedAsClient, control.listInfo);
ruta.post('/actualizarInfo', isLoggedAsClient, control.actualizarInfo);
ruta.get('/misPedidos', isLoggedAsClient, control.listMisPedidos);
ruta.get('/misPedidos/:idPedido', isLoggedAsClient, control.listMiPedido);
/*ruta.post('/add', control.guardar);
ruta.get('/eliminar/:idCliente', control.eliminar);
ruta.get('/actualizar/:idCliente', control.actualizar);
ruta.post('/actualizar/:idCliente', control.confirmar);*/
module.exports = ruta;
