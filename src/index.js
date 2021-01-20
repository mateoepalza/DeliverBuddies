
/*
 * Requerimos todos los modulos que vamos a utilizar en el aplicativo
 */
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const app = express();
const flash = require('connect-flash');
//passport
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
/*
 * Acá requerimos los parámetros necesarios para conectarnos
 * a la base de datos
 */
const {database} = require('./keys');

/*
 *  Definimos las configuraciones generales del programa
 *  definimos el puerto por donde el aplicativo va a funcionar
 *  definimos el motor de vistas -> EJS
 *  definimos en donde se van a encontrar las vistas (HTML)
 *  definimos un modulo para subir las imagenes a una carpeta específica
 */
app.set('port', process.env.PORT || 1520);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Vista'));
app.use(fileUpload());


/*
 * Importamos todas las rutas
 */
const Cliente = require('./Modelo/cliente');
const ConductorR= require('./Modelo/conductorRuta');
const Conductor = require('./Modelo/conductor');
const Proveedor = require('./Modelo/proveedor');
const proveedorProducto = require('./Modelo/proveedorProducto');
const Producto = require('./Modelo/producto');
const Costo = require('./Modelo/costo');
const Marca = require('./Modelo/marca');
const Admin = require('./Modelo/admin');
const Ruta = require('./Modelo/ruta');
const Reportes = require('./Modelo/reportes');
const Main = require('./Modelo/main');
const CliPro = require('./Modelo/clienteProducto');
const Inventario = require('./Modelo/inventario');
const Pedido = require('./Modelo/pedido');
const Bodega = require('./Modelo/bodega');
const Mas = require('./Modelo/mas');
const Permiso = require('./Modelo/permiso');

require('./Modelo/passport');
//funciones antes de las peticiones de los usuarios (rutas del servidor)
app.use(morgan('dev'));   //Registrar las peticiones que llegan.
app.use(express.json());
/*
 * Inicializamos el modulo de las sesiones
 */
app.use(session({
    secret: 'sessiones',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore (database)
}));

/*
 * inicializando passport
 */
app.use(passport.initialize());
app.use(passport.session());

/*
 * Flash es un modulo que nos permite enviar mensajes en tipo de alerta a cada vista
 */
app.use(flash());

/*
 *  Inicializamos las variables de session de cada usuario en un middleware propio
 */
app.use((req, res, next)=>{
    app.locals.success = req.flash('success');
    app.locals.unsuccess = req.flash('unsuccess');
    app.locals.user = req.user;
    //app.locals.user.proCom = new Array();
    next();
    /* toma la info del usuario, toma lo que el servidor quiere responder y toma
     * una funcion para continuar con todo el codigo. (colocar variables que
     * querramos usar o acceder desde cualquier parte)
     */
});

/*
 *desde el modulo de expres requrimos un metodo que nos permitira entender todo datos que
 *vengan del formulario, extend:false significa que solo nos mandara los campos del
 * formulario. Cuando tratemos de recibir un dato.
 */
app.use(express.urlencoded({extended: false}));

//Rutas
app.use('/cliente/', Cliente);
app.use('/conductor/', Conductor);
app.use('/conductorRuta/', ConductorR);
app.use('/proveedorProducto/', proveedorProducto);
app.use('/proveedor/', Proveedor);
app.use('/producto/', Producto);
app.use('/costo/', Costo);
app.use('/marca/', Marca);
app.use('/rutas/', Ruta);
app.use('/profile/', Admin);
app.use('/reportes/', Reportes);
app.use('/',Main);
app.use('/usuario/',CliPro);
app.use('/inventario/', Inventario);
app.use('/pedido/', Pedido);
app.use('/bodega/',Bodega);
app.use('/mas/',Mas);
app.use('/permiso/',Permiso);

/*
 * Definimos la carpeta estatica, es decir el css, Javascript lado del cliente, imagenes
 * pdf creados por el aplicativo
 */
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  console.log("dfds");
  res.status(404).render('404');
})

/*
 * Inicializamos el servidor
 */
app.listen(app.get('port'), function(){
    console.log('Server on port 1520');
});
