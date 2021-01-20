const controlador = {};
const passport = require('passport');
const pool = require('../database');
const helpers = require('../Modelo/helpers');
let pdf = require("html-pdf");

//Mateo space

controlador.mainProducts = async function(req, res){
  //req.session.proCom = [];
  //req.passport.user.proCom = new Array();

  let marca  = await pool.query('select idMarca, nombre from marca');
  console.log(marca);
  res.render('clienteProducto',{
    "marca": marca
  });
}

controlador.selectSearchProducts = async function(req, res){
  try{
    const name = req.query.nombre;

    let products = await pool.query('select idProducto, nombre, valorUnidad, urlImage from producto where nombre like "%'+name+'%"');
    products = await controlador.checkAllProducts(products);

    res.json({
      "status": true,
      "products" : products,
      "msj" : "La petición fue ejecutada correctamente"
    })

  }catch(e){
    console.error(e);
    res.json({
      "status": false,
      "products" : [],
      "msj" : "La petición fue ejecutada incorrectamente"
    })
  }
}

controlador.selectSearchProductsMarca = async function(req, res){

  try{
    console.log(req.query);
    const marca = req.query.idMarca;

    let products = await pool.query('select idProducto, nombre, valorUnidad, urlImage from producto where FK_idMarca = ?', marca);
    products = await controlador.checkAllProducts(products);
    console.log()
    res.json({
      "status": true,
      "products" : products,
      "msj" : "La petición fue ejecutada correctamente"
    })
  }catch(e){
    console.error(e);
    res.json({
      "status" : false,
      "products" : [],
      "msj" : "La petición fue ejecutada incorrectamente"
    });
  }

}

controlador.selectProducts = async function(req, res){
  try{
    let productos = await pool.query('select idProducto, nombre, valorUnidad, urlImage from producto');
    productos = await controlador.checkAllProducts(productos);
    res.json({
      "status" : true,
      "products" : productos,
      "msj" : "La petición fue ejecutada correctamente"
    });
  }catch(e){
    console.error(e);
    res.json({
      "status" : false,
      "products" : [],
      "msj" : "La petición fue ejecutada incorrectamente"
    });
  }

}

controlador.checkAllProducts = async function(productos){

  for(let i = 0; i < productos.length; i++){
      let stock = await controlador.stockProduct(productos[i].idProducto);

      if(stock > 0){
        productos[i].stock = 1;
      }else{
        productos[i].stock = 0;
      }

  }

  return productos;

}

controlador.stockProduct = async function(idProducto){
  try{

      const salida = await pool.query('select sum(cantidad) as cantidad from productopedido where FK_idProducto = ?',[idProducto]);
      const entrada = await pool.query('select sum(cantidad) as cantidad from proveedorproducto where FK_idProducto = ? ', [idProducto]);

      return entrada[0].cantidad - salida[0].cantidad ;

  }catch(e){
    console.error(e);
  }


}


controlador.selectAllProducts = async function(req, res){
  try{
    if(req.session.proCom.length > 0){
      const prod = [];

      for(let i = 0; i < req.session.proCom.length; i++){
        const producto = await pool.query('select idProducto, nombre, valorUnidad, urlImage from producto where idProducto = ?',[req.session.proCom[i][0]]);
        prod.push(producto[0]);
      }

      res.json({
        "status": true,
        "productos": prod,
        "msj" : "The operation was successful"
      });

    }else{
      res.json({
        "status" : true,
        "productos" : [],
        "msj" : "There are not products"
      })
    }
  }catch(e){
    console.error(e);
    res.json({
      "status" : false,
      "productos" : [],
      "msj" : "The query failed"
    });
  }


}

controlador.selectProduct = async function(req, res){

  const id = req.query.id;
  if(!controlador.checkProduct(req, id)){
    try{
        const producto = await pool.query('select idProducto, nombre, valorUnidad, urlImage from producto where idProducto = ?',[id]);

        var r = [producto[0].idProducto,1];
        req.session.proCom.push(r);
        res.json(producto);

    }catch(e){
      console.error(e);
    }
  }
}

controlador.checkProduct = function(req, str){
  try{
    var bool = false;
    for(var i = 0; i < req.session.proCom.length; i++){
      if(req.session.proCom[i][0] == str){
        bool = true;
      }
    }
    return bool;
  }catch(e){
    console.error(e)
  }
}

controlador.deleteProduct = function(req,res){

  var id = req.query.id;
  var pos = null;


  for(var i = 0; i < req.session.proCom.length; i++){
    if(req.session.proCom[i][0] == id){
      pos = i;
    }
  }
  if(pos != null){
      req.session.proCom.splice(pos, 1);
      response = {status: "true"};
  }else{
      response = {status: "false"};
  }
  res.json(response);
}

controlador.updateCantProduct = function(req, res){

  var id = req.query.id;
  var cant = req.query.cant;
  var boolean = false;
  var response = null;


  for(var i = 0; i < req.session.proCom.length; i++){

    if(req.session.proCom[i][0] == id){
      req.session.proCom[i][1] = cant;
      boolean = true;
    }
  }

  if(boolean){
    response ={status: "True"};
  }else{
    response = {status: "False"};
  }

    res.json(response);

}


controlador.updatePrice = async function(req, res){
  var sum = await controlador.getTotalPrice(req);
  console.log(sum+" suma total");
  res.json({precio: sum});
}

controlador.getTotalPrice = async function(req){

  var sum = 0;

  for(var i = 0; i < req.session.proCom.length; i++){

    const price = await pool.query('select valorUnidad from producto where idProducto = ?', req.session.proCom[i][0])
    var mul = price[0].valorUnidad*req.session.proCom[i][1];
    sum += mul;
    console.log(mul+" acaaa"+price);
  }

  return sum;
}
/*
controlador.getPrice = async function(id,req){
  let promise = new Promise( (resolve, reject) => {
    req.getConnection( function(err, conn){
      conn.query('select valorUnidad from producto where idProducto = ?',id, function(err,price){
          if(err){
            reject(err);
          }
          console.log(price[0].valorUnidad+" second"+id);
          resolve(price[0].valorUnidad);
      })
    })
  })
  return promise;
}
*/
controlador.checkOut = async function(req, res){
  /*Acá tiene que ir la variable de usuario*/
  try{
    const data = req.user.email;
    const prod = req.session.proCom;

    let cliente = await pool.query('select cliente.nombre as nombre, direccion, email, ciudad.nombre as ciudad from cliente inner join ciudad on idCiudad = FK_idCiudad where email = ? ', [data]);

    let productos = await controlador.getProductsCheckout(prod);
    let total =  await controlador.getTotalPrice(req);
    console.log(cliente);
    console.log(productos);
    res.render('checkOut',{
      data : cliente[0],
      product: productos,
      total: total
    });
  }catch(e){
    console.error(e);
    req.flash('unsuccess','ha ocurrido algo inesperado, por favor intenta mas tarde.')
    res.redirect('/usuario');
  }

}

controlador.getProductsCheckout = async function(prod){
    try{
      let productos = new Array();

      for(let i = 0; i < prod.length; i++){
          product = await pool.query('select idProducto, nombre, valorUnidad, urlImage from producto where idProducto = ?', [prod[i][0]]);
          product[0].cant = prod[i][1];
          productos.push(product[0]);
      }
      return productos;
    }catch(e){
      console.error(e)
    }

}

controlador.compra = async function(req, res){
  try{
    const data = req.body;
    const fechaPedido = new Date();
    let fechaEntrega = new Date();
    console.log(fechaPedido);
    console.log(data.tipoEnvio);
    fechaEntrega = sumarDias(fechaEntrega, data.tipoEnvio);
    console.log(req.user.idCliente);
    let o = new Object();
    o.fechaEntrega = fechaEntrega;
    o.fechaPedido = fechaPedido;
    o.FK_idCliente = req.user.idCliente;
    o.FK_idConductorRuta = await controlador.getRutaAuto(req.user.idCliente);
    console.log(o.FK_idConductorRuta);

    //await pool.query('insert into pedido set ? ', [o]);

    pool.getConnection((err, conn) => {
      conn.query('start transaction', function(){
        if(err){
          console.log(err)
        }
        conn.query('insert into pedido set ? ', [o], function(err, result){
          if(err){
            console.log(err)
          }
          conn.query('select last_insert_id() as id', async function(err, resu){
            if(err){
              console.log(err)
            }

            let state = false;
            let changeState = false;
            let arr = req.session.proCom;
            let id = resu[0].id;

            for(let i = 0; i < arr.length; i++){

              const o = new Object();
              o.FK_idPedido = id;
              o.FK_idProducto = arr[i][0];
              o.cantidad = arr[i][1];

              changeState = await controlador.compraProductos(conn, o);

              if(changeState){
                state = changeState;
              }

            }

            console.log(state);

            if(state){

              console.log("rollback");

              conn.query('rollback', function(err){
                if(err){
                  console.log(err);
                }
                req.flash('unsuccess', 'La compra no ha sido exitosa, los productos que seleccionanste se encuentran agotados.');
                res.redirect('./')
              });
            }else{

              console.log("commit");

              conn.query('commit', function(err, response){
                if(err){
                  console.log(err);
                }
                /*
                 * Al realizar la compra reinicio el carrito
                 */
                 console.log("commit done");
                req.session.proCom = [];
                console.log("session clean");
                /*
                 * Mando el mensaje de success y redirijo
                 */
                req.flash('success', 'La compra ha sido exitosa');
                console.log("flash sent");
                res.redirect('./');
              });
            }
          });
        });
      });
    });

  }catch(e){
    console.error(e);
  }
}

controlador.getRutaAuto = async function(id){
  const  ruta = await pool.query('select idConductorRuta from conductorruta where FK_idRuta IN (select FK_idRuta from cliente where idCliente = ?)',[id]);

  return ruta[0].idConductorRuta;
}
controlador.compraProductos = async function(conn, o){
  let pro =  new Promise(function(resolve, reject){
        conn.query('insert into productopedido set ? ', [o], function(erro, res){

          if(erro){
            console.error(erro);
            resolve(true);
          }else{
            resolve(false);
          }

        });
  });
  return pro;
}
/*sumarDias(fecha, envio){
 * Se encuentra todo lo relacionado con los botones mas
 */

  /* Funciones mas del popup*/

  controlador.masCliente = async function(req, res){
    const data = req.body.idTable;
    const clientes = await pool.query('select idCliente, cliente.nombre as cliente, direccion, ciudad.nombre as ciudad, FK_idRuta, ruta.nombre as ruta from cliente inner join ciudad on FK_idCiudad = idCiudad inner join ruta on FK_idRuta = idRuta where idCliente = ? ',[data]);

    res.json({"status": true,"productos": clientes});
    /*
    req.getConnection(function(err, conn){
      conn.query('select idCliente, cliente.nombre as cliente, direccion, ciudad.nombre as ciudad, FK_idRuta, ruta.nombre as ruta from cliente inner join ciudad on FK_idCiudad = idCiudad inner join ruta on FK_idRuta = idRuta where idCliente = ? ',[data], function(err, clientes){
        console.log(clientes);
        if(err){
          res.json({"status" : false});
        }else{

          res.json({"status" : true,
                    "productos" : clientes
          });
        }

      });
    });*/
  }

  controlador.masProducto = async function(req, res){
    const data = req.body.idTable;

    const productos = await pool.query('select idProducto, producto.nombre, valorUnidad, urlImage, Marca.nombre as Marca from producto inner join Marca on FK_idMarca = idMarca where idProducto = ?',[data]);

    res.json({
      "status":true,
      "productos":productos
    });
    /*
    req.getConnection(function(err, conn){
      conn.query('select idProducto, producto.nombre, valorUnidad, urlImage, Marca.nombre as Marca from producto inner join Marca on FK_idMarca = idMarca where idProducto = ?', [data], function(err, productos){
        if(err){
          res.json({"status" : false});
        }else{
          res.json({"status" : true,
                    "productos" : productos
                  });
        }
      });
    });*/
  }

  controlador.masRuta = async function(req, res){
    const data = req.body.idTable;

    const rutas = await pool.query('select idRuta, ciudad.nombre as "Ciudad Origen", city.nombre as "Ciudad Destino", ruta.nombre, DATE_FORMAT(fechaApertura, "%Y-%m-%d") from ruta inner join ciudad on FK_idCiudadOrigen = idCiudad inner join Ciudad as city on FK_idCiudadDestino = city.idCiudad where idRuta = ?',[data]);

    res.json({
        "status": true,
        "productos": rutas
    });

    /*
    req.getConnection(function(err, conn){
      conn.query('select idRuta, ciudad.nombre as "Ciudad Origen", city.nombre as "Ciudad Destino", ruta.nombre, DATE_FORMAT(fechaApertura, "%Y-%m-%d") from ruta inner join ciudad on FK_idCiudadOrigen = idCiudad inner join Ciudad as city on FK_idCiudadDestino = city.idCiudad where idRuta = ?',[data], function(err, rutas){
        if(err){
          res.json({"status" : false});
        }else{
          res.json({"status" : true,
                    "productos" : rutas
                  });
        }
      });
    });*/
  }

  controlador.masConductor = async function(req, res){
    const data = req.body.idTable;

    const conductores = await pool.query('select idConductor, nombre, direccion, DATE_FORMAT(fechaIngresoEmpresa, "%Y-%m-%d") from conductor where idConductor = ?',[data]);

    res.json({
        "status": true,
        "productos": conductores
    });
    /*
    req.getConnection(function(err, conn){
      conn.query('select idConductor, nombre, direccion, DATE_FORMAT(fechaIngresoEmpresa, "%Y-%m-%d") from conductor where idConductor = ? ', [data], function(err, conductores){
        if(err){
          res.json({"status" : false});
        }else{
          res.json({"status" : true,
                    "productos" : conductores
                  });
        }
      });
    });*/
  }
  controlador.masConductorRuta = async function(req, res){
    const data = req.body.idTable;
    const cR = await pool.query('select idConductorRuta, DATE_FORMAT(fechaInicio, "%Y-%m-%d") as fechaInicio, DATE_FORMAT(fechaFin, "%Y-%m-%d") as fechaFin, FK_idConductor, Conductor.nombre as conductor, FK_idRuta, ruta.nombre as ruta from ConductorRuta inner join Conductor on FK_idConductor = idConductor inner join ruta on FK_idRuta = idRuta where idConductorRuta = ? ',[data]);

    res.json({
        "status": true,
        "productos": cR
    });
    /*
    req.getConnection(function(err, conn){
      conn.query('select idConductorRuta, DATE_FORMAT(fechaInicio, "%Y-%m-%d") as fechaInicio, DATE_FORMAT(fechaFin, "%Y-%m-%d") as fechaFin, FK_idConductor, Conductor.nombre as conductor, FK_idRuta, ruta.nombre as ruta from ConductorRuta inner join Conductor on FK_idConductor = idConductor inner join ruta on FK_idRuta = idRuta where idConductorRuta = ? ',[data], function(err, cR){
        if(err){
          res.json({"status" : false});
        }else{
          res.json({"status" : true,
                    "productos" : cR
                  });
        }
      });
    });*/

  }

  /*
   * Funciones mas del select
   */

   controlador.masSelectRuta = async function(req, res){

     let data = req.body.idCiudad;
     const rutas = await pool.query('select idRuta, nombre from ruta where fk_idCiudadDestino = ?',[data]);
     res.json({
       "status":true,
       "data": rutas
     });

   }

   controlador.masSelectPlanilla = async function(req, res){

     const data = req.body;
     const planilla = await pool.query('select idConductorRuta from ConductorRuta inner join Ruta on idRuta = FK_idRuta where FK_idCiudadDestino in (select FK_idCiudad from Cliente where idCliente = ?) ', [data.idCliente])

     res.json({
       "status": true,
       "data": planilla
     });
     /*const data = req.body;
     console.log(data);
     req.getConnection(function(err, conn){
       conn.query('select idConductorRuta from ConductorRuta inner join Ruta on idRuta = FK_idRuta where FK_idCiudadDestino in (select FK_idCiudad from Cliente where idCliente = ?) ', [data.idCliente], function(err, planilla){
         if(err){
           res.json({"status": false});
         }else{
           res.json({
             "status": true,
             "data": planilla
           });
         }
       });
     });*/
   }

 /*
  * Final de todo lo relacionado con los botones mas
  */

  /*
   * Se encuentra todo lo relacionado con el formulario logIn y el forulario signUp
   */
   controlador.mainLogIn = function(req, res){
     res.render('index');
   }
   controlador.mainSingUp = async function(req, res){

      const ciudades = await pool.query('select * from ciudad');

      const rutas = await pool.query('select idRuta, nombre from ruta');

      res.render('Registro',{ciudades,rutas});
   }

  controlador.crearSesion = async function(req,res,next){
    try{
      let ciudad = req.body.FK_idCiudad;
      const data = await pool.query('select idRuta from ruta where FK_idCiudadDestino = ?', [ciudad]);
      console.log(data);
      req.body.FK_idRuta = parseInt(data[0].idRuta);
      passport.authenticate('local.signUp', {
        successRedirect: '/usuario',
        failureRedirect: '/',
        failureFlash: true
      })(req,res,next);
    }catch(e){
      console.error(e)
    }

  };

   controlador.inicioSesion = async function(req, res, next){
    const {email} = req.body;
    let emailAdmin = "";
     //UTILIZAR ESTE LINK PARA ENCRIPTAR LAS CONTRASEÑAS Y GUARDARLAS EN LA BASE DE DATOS.
     const buscar = await pool.query('select * from administrador where email = ?',[email]);
     if(buscar.length > 0){
        emailAdmin = buscar[0].email;
     }

     //contraseña: http://www.passwordtool.hu/blowfish-password-hash-generator
     if(emailAdmin){
       passport.authenticate('local.logIn', {
         successRedirect: '/profile',
         failureRedirect: '/',
         failureFlash: true
       })(req,res,next);
     }else{
       passport.authenticate('local.logIn', {
         successRedirect: '/usuario',
         failureRedirect: '/',
         failureFlash: true
       })(req,res,next);
     }

  }

  controlador.cerrarSesion = function(req, res){
    req.logOut();
    res.redirect('/');
  }

   /*
    * Se encuentra todo lo relacionado con el formulario logIn y el forulario signUp
    */

 /*
  * Se encuentra toda el código de la tabla inventario
  */
controlador.listInventario = async function(req, res){
  const data = await pool.query('select FK_idProducto, nombre, estante, cantidad from inventario inner join bodega on FK_idBodega = idBodega inner join producto on idProducto = FK_idProducto');
  const productos = await pool.query('select idProducto, nombre from producto');
  const bodega = await pool.query('select * from bodega');

  res.render('inventario', {data,productos,bodega});
}

controlador.guardarInventario = async function(req, res){
  const data = req.body;
  await pool.query('insert into inventario set ?',[data]);
  res.redirect('/inventario');
}

controlador.eliminarInventario = async function(req, res){
  const data = req.params.idInventario;
  await pool.query('delete from inventario where FK_idProducto = ?',[data]);
  res.redirect('/inventario');
}

controlador.actualizarInventario = async function(req, res){
  const idInv = req.params.idInventario;
  const data = await pool.query('select producto.nombre, FK_idBodega, cantidad from inventario inner join producto on idProducto = FK_idProducto where FK_idProducto = ?',[idInv]);

  const productos = await pool.query('select idProducto, nombre from producto');

  const bodega = await pool.query('select * from bodega');

  res.render('EdicionInventario',{
    data: data[0],
    productos,
    bodega
  });
}

controlador.confirmarInventario = async function(req, res){
  const newData = req.params.idInventario;
  const data = req.body;
  await pool.query('update inventario set ? where FK_idProducto = ?',[data,newData]);
  res.redirect('/Inventario');
}
/*
 * final inventario
 */


 /*
  * Se encuentra toda el código de la tabla Pedido
  */
  controlador.listPedido= async function (req, res){
      var Variable = req.query.valid;
      const data = await pool.query('select idPedido, DATE_FORMAT(fechaEntrega, "%Y/%m/%d") as fechaEntrega, DATE_FORMAT(fechaPedido, "%Y/%m/%d") as fechaPedido, FK_idCliente, cliente.nombre as cliente, FK_idConductorRuta, sum(cantidad * valorUnidad) as Total from pedido inner join cliente on FK_idCliente = idCliente left join productopedido on idPedido = FK_idPedido left join producto on FK_idProducto = idProducto group by idPedido' );

      const clientes = await pool.query('select idCliente, nombre from cliente');

      const conductorRutas = await pool.query('select idConductorRuta from conductorRuta');

      res.render('Pedido', {
                data : data,
                clientes : clientes,
                conductorRutas : conductorRutas,
              });

    }
    controlador.guardarPedido = async function(req, res){
      try{
        var fecha = new Date();
        const data = req.body;
        data.fechaPedido=fecha;
        var fechaEnt=new Date();
        var envio = data.Tipo_envio;
        data.fechaEntrega=sumarDias(fechaEnt,envio)
        delete data.Tipo_envio;

        await pool.query('insert into pedido set ?',[data]);
        req.flash('success','El pedido ha sido guardado correctamente');
        res.redirect('/pedido');
      }catch(e){
        req.flash('unsuccess','No ha sido posible guardar el pedido');
        res.redirect('/pedido');
      }

    }

    function sumarDias(fecha, envio){
      var dias=0;
      if(envio==7){
        dias=7;
      }else if(envio==4){
        dias=4;
      }else if(envio==2){
        dias=2;
      }
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    }

    controlador.eliminarPedido = async function(req, res){
      try{
        const data = req.params.idPedido;
        await pool.query('delete from pedido where idPedido = ?',[data]);
        req.flash('success','El pedido ha sido eliminado correctamente');
        res.redirect('/pedido');
      }catch(e){
        req.flash('unsuccess','No ha sido posible eliminar el pedido');
        res.redirect('/pedido');
      }

    }

    controlador.actualizarPedido = async function(req, res){

        var fecha= new Date();
        const idPedido = req.params.idPedido;

        const data = await pool.query('select DATE_FORMAT(fechaEntrega, "%Y-%m-%d") as fechaEntrega, DATE_FORMAT(fechaPedido, "%Y-%m-%d") as fechaPedido, FK_idCliente, FK_idConductorRuta from pedido where idPedido = ?',[idPedido]);

        const clientes = await pool.query('select idCliente, nombre from cliente');
        const conductorRutas = await pool.query('select idConductorRuta from ConductorRuta inner join Ruta on idRuta = FK_idRuta where FK_idCiudadDestino in (select FK_idCiudad from Cliente where idCliente = ?) ', [data[0].FK_idCliente]);

        res.render('EdicionPedido',{
          data: data[0],
          clientes,
          conductorRutas
        });

    }

    controlador.confirmarPedido = async function(req, res){
      try{
        var fecha = new Date();
        const data = req.body;
        var info = false;

        if(fecha.toLocaleDateString() == nuevafecha(data.fechaPedido)){

          const newData = req.params.idPedido;
          var envio = data.Tipo_envio;
          data.fechaEntrega=sumarDias(fecha,envio);
          delete data.Tipo_envio;

          await pool.query('update pedido set ? where idPedido = ?',[data,newData]);
          req.flash('success', 'El pedido ha sido actualizado correctamente');
          res.redirect('/Pedido/');

        }else{
          req.flash('unsuccess', 'No es posible actualizar el pedido, el pedido ya se encuentra en tramite');
          res.redirect('/Pedido/');
        }

      }catch(e){
        console.error(e);
        req.flash('unsuccess','No ha sido posible actualizar el pedido');
        res.redirect('/Pedido/');
      }

    }
    function nuevafecha(fecha){
      let arrFecha = fecha.split('-');
      console.log(arrFecha[1].replace('0',''));
      arrFecha[1] = arrFecha[1].replace('0','');
      return arrFecha[0] + "-" + arrFecha[1] + "-" + arrFecha[2];
    }
    controlador.newAdd = function(req,res){
      ventana=false;
      res.redirect('/Pedido');
    }

    controlador.masPedido = async function(req, res){
      try{
        const data = req.body.idTable;
        const productos = await pool.query('select nombre, cantidad, valorUnidad, (cantidad * valorUnidad) as Total from productopedido inner join Producto on FK_idProducto = idProducto where FK_idPedido = ? ',[data]);
        res.json({
            "status":true,
            "productos": productos
        });
      }catch(e){
        console.error(e);
      }


    }
/********************** Listado de todas la tablas del aplicativo **********************/
//Listado de todas las tablas
//Listado de todas las tablas
controlador.list = async function(req, res){

    const data = await pool.query('select idCliente, cliente.nombre as cliente, direccion, FK_idCiudad, ciudad.nombre as ciudad, email ,FK_idRuta, ruta.nombre as ruta from cliente inner join ciudad on FK_idCiudad = idCiudad inner join ruta on FK_idRuta = idRuta');

    const ciudades = await pool.query('select * from ciudad');

    const rutas = await pool.query('select idRuta, nombre from ruta');

    res.render('Clientes',{data,ciudades,rutas});

};
controlador.listConductor = async function(req, res){
    const data = await pool.query('select idConductor, direccion, nombre, DATE_FORMAT(fechaIngresoEmpresa, "%Y-%m-%d") as fechaIngresoEmpresa from conductor');

    const rutas = await pool.query('select * from ruta');

    res.render('Conductor',{data,rutas});
};
controlador.listConductorR = async function(req, res){

    const data = await pool.query('select idConductorRuta, DATE_FORMAT(fechaInicio, "%Y-%m-%d") as fechaInicio, DATE_FORMAT(fechaFin, "%Y-%m-%d") as fechaFin, FK_idConductor, FK_idRuta, conductor.nombre as conductor, ruta.nombre as ruta from conductorruta inner join ruta on conductorruta.FK_idRuta = ruta.idRuta inner join conductor on conductorruta.FK_idConductor = conductor.idConductor');

    const conductores = await pool.query('select idConductor, nombre from conductor');

    const rutas = await pool.query('select idRuta, nombre from ruta');

    res.render('conductorRuta', {data,conductores,rutas});

};
controlador.listMarca = async function(req,res){
    const data = await pool.query('select * from marca');

    res.render('Marca',{data});
};
controlador.listProducto = async function(req, res){
  try{

      let producto = await pool.query('select idProducto, producto.nombre, valorUnidad, urlImage, marca.nombre as marca, bodega.estante as ubicacion from producto inner join marca on FK_idMarca = idMarca inner join bodega on FK_idBodega = idBodega');

      for(let i = 0 ; i < producto.length; i++){

        let entra = 0;
        let sale = 0;

        /*
         * Cantidad de productos que entraron debido a los proveedores
         */

        let entrada = await pool.query('SELECT SUM(cantidad) as inData FROM ProveedorProducto WHERE FK_idProducto = ? group by FK_idProducto', [producto[i].idProducto])

          if(entrada.length > 0){
            entra = entrada[0].inData;
          }else{
            entra = 0;
          }

          /*
           * Cantidad de productos vendiddos en cada pedido
           */

          let salida = await pool.query('SELECT SUM(cantidad) as outData FROM ProductoPedido WHERE FK_idProducto = ? group by FK_idProducto', [producto[i].idProducto]);

            if(salida.length > 0){
              sale = salida[0].outData;
            }else{
              sale = 0;
            }
            producto[i].stock = (entra-sale);

      }

      const marcas = await pool.query('select * from marca');
      const bodegas = await pool.query('select * from bodega');

      res.render('Producto', {
          data: producto,
          marcas: marcas,
          bodegas: bodegas
      });

  }catch(e){
    console.error(e);
  }


};

controlador.listCostos = async function(req, res){
    const data = await pool.query('select idCosto, costo, FK_idRuta, DATE_FORMAT(fechaCosto, "%Y-%m-%d") as fechaCosto, ruta.nombre from costo inner join ruta on costo.FK_idRuta = ruta.idRuta');

    const rutas = await pool.query('select idRuta, nombre from ruta');

    res.render('Costo',{data,rutas});

};
controlador.listProveedor = async function(req, res){
    const data = await pool.query('select * from proveedor');

    res.render('Proveedor',{data});
};
controlador.listProveedorProduc = async function(req, res){

  const data = await pool.query('select proveedorproducto.idProveedorProducto, proveedorproducto.FK_idProveedor, proveedorproducto.FK_idProducto, proveedor.nombre as proveedor, producto.nombre as producto, DATE_FORMAT(fecha, "%Y-%m-%d") as fecha, cantidad from proveedorproducto inner join proveedor on proveedorproducto.FK_idProveedor = proveedor.idProveedor inner join producto on proveedorproducto.FK_idProducto = producto.idProducto');

  const proveedor = await pool.query('select * from proveedor');

  const productos = await pool.query('select * from producto');

  res.render('proveedorProducto',{data,proveedor,productos});
};
controlador.listRutas = async function(req,res){
    const data = await pool.query('select ruta.idRuta, co.nombre as ciudadOrigen, cd.nombre as ciudadDestino, ruta.nombre, DATE_FORMAT(fechaApertura, "%Y-%m-%d") as fechaApertura, costo.costo, max(DATE_FORMAT(costo.fechaCosto, "%Y-%m-%d")) as fechaCosto from ruta inner join Ciudad as cd on cd.idCiudad = ruta.FK_idCiudadDestino inner join Ciudad as co on co.idCiudad = ruta.FK_idCiudadOrigen left join costo on ruta.idRuta = costo.FK_idRuta group by ruta.idRuta');

    const ciudades = await pool.query('select * from ciudad');

    res.render('Rutas',{data,ciudades});

};
controlador.listInfo = async function (req, res) {
  try{

    const idCliente = req.user.idCliente;
    console.log(idCliente)
    const data = await pool.query('select * from cliente where idCliente = ?', [idCliente]);
    console.log(data);
    const ciudad = await pool.query('select * from ciudad');
    res.render('ClienteIB', {
      data: data[0],
      ciudad: ciudad,
    });

  }catch(e){
    console.error(e);
  }
}
  controlador.listInfoAdmin = async function(req, res){
  try {
      const idAdmin = req.user.idAdministrador;
      const data = await pool.query('select * from administrador where idAdministrador = ?',[idAdmin]);
      res.render('AdminPerfil',{
        data: data[0]
      });
  }catch(e){
      console.error(e);
  }
}

controlador.listMisPedidos = async function(req, res){

  try{
    console.log(req.user.idCliente);
    let pedido = await pool.query('select idPedido, DATE_FORMAT(fechaPedido, "%Y-%m-%d") as fechaPedido, DATE_FORMAT(fechaEntrega, "%Y-%m-%d") as fechaEntrega, FK_idConductorRuta, sum(cantidad * valorUnidad) as valorTotal from pedido inner join productopedido on idPedido = FK_idPedido inner join producto on FK_idProducto = idProducto where FK_idCliente = ? group by idPedido;',req.user.idCliente);
    console.log(pedido);
    res.render('misPedidos',{"pedido" : pedido});

  }catch(e){
    console.error(e);
  }


}

controlador.listMiPedido = async function(req, res){
  try{

      const idPedido =  req.params.idPedido;

      let pedido = await pool.query('select idPedido, DATE_FORMAT(fechaPedido, "%Y-%m-%d") as fechaPedido, DATE_FORMAT(fechaEntrega, "%Y-%m-%d") as fechaEntrega, FK_idConductorRuta, sum(cantidad * valorUnidad) as valorTotal from pedido inner join productopedido on idPedido = FK_idPedido inner join producto on FK_idProducto = idProducto where idPedido = ? ', idPedido);
      let productos = await pool.query('select urlImage, producto.nombre as nombre, valorUnidad, cantidad, marca.nombre as marca from productopedido inner join producto on FK_idProducto = idProducto inner join marca on FK_idMarca = idMarca where FK_idPedido = ?', idPedido);

      for(let i = 0; i < productos.length; i++){
        productos[i].valorTotal = productos[i].valorUnidad * productos[i].cantidad;
      }

      res.render('miPedido',{
        "pedido" : pedido,
        "productos" : productos
      });
  }catch(e){

  }

}
/*
 * función que lista los rutas y/o permisos que existen en el aplicativo
 */
  controlador.listPermiso = async function(req, res){

    try{

      const permisos = await pool.query('Select * from permiso');

      res.render('permiso',{
        "permiso": permisos
      });

    }catch(e){
      console.error(e);
    }
  }
  controlador.listBodega = async function(req, res){

  try{
    let bodega = await pool.query('select * from bodega');
    res.render('Bodega',{bodega});

  }catch(e){
    console.error(e);
  }
}

//Metodos de consulta
controlador.consultarCliente = async function(req, res){
  const clientes = await pool.query('select * from cliente where idCliente = ?', [data]);
  res.render('ClienteCon', {
      data: clientes
  });
    /*const data = req.params.idCliente;
    req.getConnection(function(err, conn){
        conn.query('select * from cliente where idCliente = ?', [data], function(err, Clientes){
            if(err){
                res.json(err);
            }
            res.render('ClienteCon', {
                data: Clientes
            });
        });
    });*/
};
//Metodos de insercion de datos a las tablas
controlador.guardar = async function(req, res){
  try{
    const data = req.body;
    data.contrasena = await helpers.cifrar("1234") ;
    await pool.query('insert into cliente set ?',[data]);
    req.flash('success','El cliente ha sido guardado correctamente');
    res.redirect('/cliente');
  }catch(e){
    req.flash('unsuccess','No ha sido posible guardar el cliente');
    res.redirect('/cliente');
  }

};
controlador.guardarConductor = async function(req, res){
  try{

    const data = req.body;
    if(data.complete === "true"){
       /*
         * I created another object so it is easier to insert into two tables
         */
        const dataRuta = new Object();
        dataRuta.FK_idConductor = data.idConductor;
        dataRuta.FK_idRuta = data.FK_idRuta;
        dataRuta.fechaInicio = data.fechaInicio;
        dataRuta.fechaFin = data.fechaFin;

        /*
         * I delete the attributes that i don't need
        */

        delete data.complete;
        delete data.FK_idRuta;
        delete data.fechaInicio;
        delete data.fechaFin;

        /*
         * I insert into both tables
         */

         await pool.query('insert into conductor set ?',[data]);
         await pool.query('insert into ConductorRuta set ?',[dataRuta]);

         req.flash('success','El conductor ha sido guardado correctamente');
         res.redirect('/conductor');

    }else{
        delete data.complete;
        delete data.FK_idRuta;
        delete data.fechaInicio;
        delete data.fechaFin;

        await pool.query('insert into conductor set ?',[data]);

        req.flash('success','El conductor ha sido guardado correctamente');
        res.redirect('/conductor');
    }

  }catch(e){
    req.flash('unsuccess','No ha sido posible guardar el conductor');
    res.redirect('/conductor');
  }

};
controlador.guardarConductorR = async function(req, res){
  try {

    const data = req.body;
    await pool.query('insert into conductorruta set ?',[data]);
    req.flash('success', 'El registro ha sido guardado correctamente');
    res.redirect('/conductorRuta');

  } catch (e) {

    req.flash('unsuccess', 'No ha sido posible guardar el registro');
    res.redirect('/conductorRuta');

  }
};
controlador.guardarMarca = async function(req, res){
  try {
    const data = req.body;
    await pool.query('insert into marca set ?',[data]);
    req.flash('success','La marca ha sido guardada correctamente');
    res.redirect('/marca');
  } catch (e) {
    req.flash('unsuccess','No ha sido posible guardar la marca');
    res.redirect('/marca');
  }

};
controlador.guardarProducto = async function(req,res){

  try{

    const data = req.body;
    const file = req.files.urlImage;
    const filename = Math.floor(Math.random()*1000000000000)+"_"+file.name;

    file.mv(`./src/public/img/productos/${filename}`,  async function(err){
      try{
        if(err){
          console.log(err);
        }

        data.urlImage = filename;
        await pool.query('insert into producto set ?',[data]);
        req.flash('success','El producto ha sido guardado correctamente');
        res.redirect('/producto');
      }catch(e){
        req.flash('unsuccess','No ha sido posible guardar el producto');
        res.redirect('/producto');
      }


    });


  }catch(e){
    //console.error(e);
    req.flash('unsuccess','No ha sido posible guardar el producto');
    res.redirect('/producto');
  }

};

controlador.guardarCosto = async function(req, res){
  try{
    const data = req.body;
    await pool.query('insert into costo set ?',[data]);
    req.flash('success', 'El costo ha sido guardado correctamente')
    res.redirect('/costo');
  }catch(e){
    req.flash('success', 'No ha sido posible guardar el costo')
    res.redirect('/costo');
  }

};
controlador.guardarProveedor = async function(req,res){
  try{
    const data = req.body;
    await pool.query('insert into proveedor set ?',[data]);
    req.flash('success', 'El proveedor ha sido guardado correctamente');
    res.redirect('/proveedor');
  }catch(e){
    req.flash('unsuccess', 'No ha sido posible guardar el proveedor')
    res.redirect('/proveedor');
  }

};
controlador.guardarProveedorProducto = async function(req, res){
  try{
    const data = req.body;
    await pool.query('insert into proveedorproducto set ?',[data]);
    req.flash('success','El registro ha sido guardado correctamente');
    res.redirect('/proveedorproducto');
  }catch(e){
    req.flash('unsuccess','No ha sido posible guardar el registro');
    res.redirect('/proveedorproducto');
  }

};
controlador.guardarBodega = async function(req, res){
  try{
    const estante=req.body.estante;
    let validar = await pool.query('select count(idBodega) as valor from bodega where estante = ?',[estante]);
    if(validar[0].valor==1){
      req.flash('unsuccess','Ya existe un registro de bodega con ese nombre de estante, porfavor intente con uno nuevo');
    }else{
      const data = req.body;
      await pool.query('insert into bodega set ?',[data]);
      req.flash('success','El registro ha sido guardado correctamente');
    }
    res.redirect('/bodega');
  }catch(e){
    req.flash('unsuccess','No ha sido posible guardar el registro');
    res.redirect('/bodega');
  }

};
controlador.guardarRuta = async function(req, res){
  try{
    const data = req.body;

      if(data.complete === "true"){
        const costoData = new Object();

        costoData.costo = data.costo;
        costoData.fechaCosto = data.fechaCosto;

        delete data.complete;
        delete data.costo;
        delete data.fechaCosto;

        pool.getConnection((e, conn) => {
          conn.query('insert into ruta set ?', [data], function(er, ruta){

            if(er){
              console.log(er);
              req.flash('unsuccess', 'No ha sido posible la inserción de la ruta');
              res.redirect('/rutas');
            }else{
              conn.query('select last_insert_id() as id',  function(err, lastId){
                console.log(lastId);
                if(err){
                  req.flash('unsuccess', 'No ha sido posible la inserción de la ruta');
                  res.redirect('/rutas');
                }else{
                  costoData.FK_idRuta = lastId[0].id;
                  conn.query('insert into costo set ?',[costoData], function(erro, costo){
                    console.log(erro);
                    if(erro){
                      req.flash('unsuccess', 'No ha sido posible la inserción de la ruta');
                      res.redirect('/rutas');
                    }else{
                      req.flash('success', 'la ruta ha sido guardada correctamente');
                      res.redirect('/rutas');
                    }
                  });
                }
              });
            }


          })
        });

      }else{

        delete data.complete;
        delete data.costo;
        delete data.fechaCosto;

        await pool.query('insert into ruta set ?', [data]);




        req.flash('success', 'la ruta ha sido guardada correctamente');
        res.redirect('/rutas');
      }
  }catch(e){
    req.flash('unsuccess', 'No ha sido posible la inserción de la ruta');
    res.redirect('/rutas');
  }

};

controlador.guardarPermiso = async function(req, res){

  try{

    const pedido = req.body;

    await pool.query('insert into permiso set ?', [pedido]);

    req.flash('success','El permiso ha sido guardado correctamente');
    res.redirect('/permiso');

  }catch(e){
    console.error(e);
    req.flash('unsuccess','No ha sido posible la inserción del permiso');
    res.redirect('/permiso');
  }

}
//Fin metodos de insercion de datos.

//metodo de update de todas las tablas

controlador.actualizarInfo = async function (req, res) {


  try{
    const {nombre,direccion,FK_idCiudad,contrasena} = req.body;
    const idCliente = req.user.idCliente;
    const newClient = {
        nombre,
        direccion,
        FK_idCiudad,
        contrasena
    }
    newClient.contrasena = await helpers.cifrar(contrasena);
    await pool.query('update cliente set ? where idCliente = ?', [newClient ,idCliente]);

    req.flash('success','Su información personal ha sido actualizada correctamente');
    res.redirect('/usuario');
  }catch(e){
    console.error(e)
    req.flash('unsuccess','No ha sido posible actualizar su información personal');
    res.redirect('/usuario')
  }

  /*var data = req.body;
  req.getConnection(function (err, conn) {
    conn.query('update cliente set ? where idCliente=3', [data], function (err, Data) {
      if (err) {
        res.json(err);
      }
      req.flash('success', 'La actualizacion ha sido exitosa');
      res.redirect('/clienteIB/');
    });
  });*/
}

controlador.actualizar = async function(req, res){
    const idCliente = req.params.idCliente;
    console.log(idCliente);
    const data = await pool.query('select * from cliente where idCliente = ?',[idCliente]);

    const ciudades = await pool.query('select * from ciudad');

    const rutas = await pool.query('select idRuta, nombre from ruta');

    res.render('EdicionCli',{
          data: data[0],
          ciudades,
          rutas
    });
    /*
    req.getConnection(function(err, conn){
        conn.query('select * from cliente where idCliente = ?',[data], function(err,client){
          conn.query('select * from ciudad', function(err, ciudades){
            conn.query('select idRuta, nombre from ruta', function(err, rutas){
              res.render('EdicionCli', {
                  data : client[0],
                  ciudades : ciudades,
                  rutas : rutas
              });
            });
          });
        });
    });*/
};
controlador.actualizarAdmin = async function(req, res){
  try {
      const idAdmin = req.user.idAdministrador;
      const data = await pool.query('select * from administrador where idAdministrador = ?',[idAdmin]);
      res.render('actAdmin',{
        data: data[0]
      });
  }catch(e){
      console.error(e);
  }
};
controlador.actualizarConductor = async function(req, res){
    const idConductor = req.params.idConductor;

    const data = await pool.query('select idConductor, direccion, nombre, DATE_FORMAT(fechaIngresoEmpresa, "%Y-%m-%d") as fechaIngresoEmpresa from conductor where idConductor = ?',[idConductor]);

    res.render('EdicionCond', {
          data: data[0]
    });
    /*
    req.getConnection(function(err, conn){
        conn.query('select idConductor, direccion, nombre, DATE_FORMAT(fechaIngresoEmpresa, "%Y-%m-%d") as fechaIngresoEmpresa from conductor where idConductor = ?', [data], function(err, conductor){
            res.render('EdicionCond', {
                data: conductor[0]
            });
        });
    });*/
};

controlador.actualizarConductorR = async function(req, res){
    const idConductorRuta = req.params.idConductorRuta;
    const data = await pool.query('select idConductorRuta, DATE_FORMAT(fechaInicio, "%Y-%m-%d") as fechaInicio, DATE_FORMAT(fechaFin, "%Y-%m-%d") as fechaFin, FK_idConductor, FK_idRuta from conductorruta where idConductorRuta = ?',[idConductorRuta]);

    const conductores = await pool.query('select idConductor, nombre from conductor');

    const rutas = await pool.query('select idRuta, nombre from ruta');

    res.render('EdicionCR', {
        data: data[0],
        rutas,
        conductores
    });
    /*
    req.getConnection(function(err, conn){
        conn.query('select idConductorRuta, DATE_FORMAT(fechaInicio, "%Y-%m-%d") as fechaInicio, DATE_FORMAT(fechaFin, "%Y-%m-%d") as fechaFin, FK_idConductor, FK_idRuta from conductorruta where idConductorRuta = ?', [data], function(err, conductorR){
          if(err){
            res.json(err);
          }
          conn.query('select idConductor, nombre from conductor', function(err, conductores){
            if(err){
              res.json(err);
            }
            conn.query('select idRuta, nombre from ruta', function(err, rutas){
              res.render('EdicionCR', {
                 conductores : conductores,
                 rutas : rutas,
                 data: conductorR[0]
              });
            });
          });
        });
    });*/
};
controlador.actualizarMarca = async function(req, res){
    const idMarca = req.params.idMarca;
    const data = await pool.query('select * from marca where idMarca = ?',[idMarca]);

    res.render('EdicionMarca',{
          data: data[0]
    });
    /*
    req.getConnection(function(err, conn){
        conn.query('select * from marca where idMarca = ?',[data], function(err,Marca){
            res.render('EdicionMarca', {
                data: Marca[0]
            });
        });
    });*/
};
controlador.actualizarProducto = async function(req,res){
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  console.log(req.originalUrl);
  console.log(fullUrl);
    const idProducto = req.params.idProducto;
    const data = await pool.query('select * from producto where idProducto = ?',[idProducto]);
    const marcas = await pool.query('select * from marca');
    const bodegas = await pool.query('select * from bodega');

    res.render('EdicionProd', {
          data: data[0],
          marcas,
          bodegas
    });
    /*
    req.getConnection(function(err,conn){
        conn.query('select * from producto where idProducto = ?', [data], function(err,Producto){
          if(err){
            res.json(err);
          }
          conn.query('select * from Marca', function(err, marca){
            if(err){
              res.json(err);
            }
            conn.query('select * from Bodega', function(err, bodegas){
              if(err){
                res.json(err);
              }
              res.render('EdicionProd',{
                  data: Producto[0],
                  marcas: marca,
                  bodegas: bodegas
              });
            });
          });
        });
    });*/
};
controlador.actualizarCosto = async function(req, res){
    const idCosto = req.params.idCosto;
    const data = await pool.query('select idCosto, costo, DATE_FORMAT(fechaCosto, "%Y-%m-%d") as fechaCosto from costo where idCosto = ? ',[idCosto]);

    const rutas = await pool.query('select idRuta, nombre from ruta');

    res.render('EdicionCosto', {
        data: data[0],
        rutas
    });
    /*
    req.getConnection(function(err, conn){
        conn.query('select idCosto, costo, DATE_FORMAT(fechaCosto, "%Y-%m-%d") as fechaCosto from costo where idCosto = ?',[data], function(err, Costo){
          if(err){
            res.json(err);
          }
          conn.query('select idRuta, nombre from ruta', function(err, rutas){
            if(err){
              res.json(err)
            }
            res.render('EdicionCosto', {
                data: Costo[0],
                rutas : rutas
            });
          });
        });
    });*/
};
controlador.actualizarProveedor = async function(req, res){
    const idProveedor = req.params.idProveedor;
    const data = await pool.query('select * from proveedor where idProveedor = ?',[idProveedor]);

    res.render('EdicionProv',{data: data[0] });
    /*
    req.getConnection(function(err, conn){
        conn.query('select * from proveedor where idProveedor = ?', [data], function(err, Proveedor){
            res.render('EdicionProv', {
                data: Proveedor[0]
            });
        });
    });*/

};
controlador.actualizarproveedorProducto = async function(req, res){
    const idProveedorProducto = req.params.idProveedorProducto;
    const data = await pool.query('select idProveedorProducto, FK_idProveedor, FK_idProducto, DATE_FORMAT(fecha, "%Y-%m-%d") as fecha, cantidad from proveedorproducto where idProveedorProducto = ?',[idProveedorProducto]);

    const proveedor = await pool.query('select * from proveedor');

    const producto = await pool.query('select * from producto');

    res.render('EdicionProvProduc',{
        data: data[0],
        proveedor,
        producto
    });
    /*
    req.getConnection(function(err, conn){
        conn.query('select idProveedorProducto, FK_idProveedor, FK_idProducto, DATE_FORMAT(fecha, "%Y-%m-%d") as fecha, cantidad from proveedorproducto where idProveedorProducto = ?', [data], function(err, ProveedorProduc){
          if(err){
            res.json(err);
          }
          conn.query('select * from proveedor', function(err, Proveedor){
              if(err){
                res.json(err);
              }
              conn.query('select * from producto', function(err, Producto){
                if(err){
                  res.json(err);
                }
                res.render('EdicionProvProduc', {
                  data: ProveedorProduc[0],
                  proveedor: Proveedor,
                  producto: Producto
              });
              });
          })
        });
    });*/
};

controlador.actualizarRuta = async function(req, res){
    const idRuta = req.params.idRuta;
    const data = await pool.query('select idRuta, nombre, DATE_FORMAT(fechaApertura, "%Y-%m-%d") as fechaApertura, FK_idCiudadOrigen, FK_idCiudadDestino  from ruta where idRuta = ?',[idRuta]);

    const ciudades = await pool.query('select * from ciudad');

    res.render('EdicionRuta',{
        data: data[0],
        ciudades
    });
    /*
    req.getConnection(function(err, conn){
        conn.query('select * from ruta where idRuta = ?', [data], function(err, Ruta){
            if(err){
              res.json(err);
            }
            conn.query('select * from ciudad ', function(err, Ciudades){
                res.render('EdicionRuta', {
                  data: Ruta[0],
                  ciudades: Ciudades
              });
            });
        });
    });*/
};

controlador.actualizarPermiso = async function(req, res){

  try{

    const idPermiso  = req.params.idPermiso;

    const permiso = await pool.query('select url from permiso where idPermiso = ?', idPermiso);

    res.render('EdicionPermiso',{
      "permiso" : permiso[0]
    });

  }catch(e){
    console.error(e);
    req.flash('unsuccess','Ocurrió algo inesperado.')
    res.redirect('/permiso');
  }

}

controlador.actualizarBodega= async function(req, res){
  const idBodega = req.params.idBodega;
  const data = await pool.query('select idBodega,estante from bodega where idBodega = ?',[idBodega]);

  res.render('EdicionBodega',{
      data: data[0]
  });
}

controlador.confirmar = async function(req, res){
  try {
    const idCliente = req.params.idCliente;
    const newData = req.body;
    console.log(newData.contrasena)
    if(newData.contrasena){
      newData.contrasena = await helpers.cifrar(newData.contrasena);
    }else{
      delete newData.contrasena;
    }


    await pool.query('update cliente set ? where idCLiente = ?',[newData,idCliente]);
    req.flash('success', 'El cliente ha sido actualizado correctamente');
    res.redirect('/cliente');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible actualizar el cliente');
    res.redirect('/cliente');
  }
}
controlador.confirmarAdmin = async function(req, res){
    const idAdministrador = req.user.idAdministrador;
    const {nombre,direccion,email,contrasena} = req.body;
    const newAdmin = {
      idAdministrador,
      nombre,
      direccion,
      email,
      contrasena
    };
    newAdmin.contrasena = await helpers.cifrar(contrasena);
    await pool.query('update administrador set ? where idAdministrador = ?',[newAdmin,idAdministrador]);
    console.log(newAdmin);
    req.flash('success', 'La actualizacion ha sido exitosa');
    res.redirect('/profile');

}
controlador.confirmarConductor = async function(req, res){
  try {
    const data = req.params.idConductor;
    const newData = req.body;
    await pool.query('update conductor set ? where idConductor = ?',[newData,data]);
    req.flash('success', 'El conductor ha sido actualizado correctamente');
    res.redirect('/conductor');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible actualizar el conductor');
    res.redirect('/conductor');
  }

};
controlador.confirmarConductorR = async function(req, res){
  try {
    const data = req.params.idConductorRuta;
    const newData = req.body;
    await pool.query('update conductorruta set ? where idConductorRuta = ?',[newData,data]);
    req.flash('success', 'El registro ha sido actualizado correctamente');
    res.redirect('/conductorRuta');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible el actualizar registro');
    res.redirect('/conductorRuta');
  }

};
controlador.confirmarMarca = async function(req,res){
  try {
    const data = req.params.idMarca;
    const newData = req.body;
    await pool.query('update marca set ? where idMarca = ?',[newData,data]);
    req.flash('success', 'La marca ha sido actualizada correctamente');
    res.redirect('/marca');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible actualizar la marca');
    res.redirect('/marca');
  }

}
controlador.confirmarProducto = async function(req, res){
  try{
    const idProducto = req.params.idProducto;
    const newData = req.body;


        /*Primero guardo la imagen*/
        if(req.files){

          const file = req.files.urlImage;
          const filename = Math.floor(Math.random()*10000000000000)+"_"+file.name;

          file.mv(`./src/public/img/productos/${filename}`,async ()=> {
            /*Actualizo el url*/
              if(!err){
                newData.urlImage = filename;
              }
              await pool.query('update producto set ? where idProducto = ?', [newData,idProducto]);
              req.flash('success','El producto ha sido actualizado correctamente');
              res.redirect('/producto');
          });

        }else{
          await pool.query('update producto set ? where idProducto = ?', [newData,idProducto]);
          req.flash('success','El producto ha sido actualizado correctamente');
          res.redirect('/producto');
        }
  }catch(e){
    req.flash('unsuccess','no ha sido posible actualizar el producto');
    res.redirect('/producto');
  }

};
controlador.confirmarCosto = async function(req, res){
  try {
    const idCosto = req.params.idCosto;
    const newData = req.body;
    await pool.query('update costo set ? where idCosto = ?',[newData,idCosto]);
    req.flash('success', 'El costo ha sido actualizado correctamente');
    res.redirect('/costo');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible actualizar el costo');
    res.redirect('/costo');
  }

};
controlador.confirmarProveedor = async function(req, res){

  try {
    const idProveedor = req.params.idProveedor;
    const newData = req.body;
    await pool.query('update proveedor set ? where idProveedor = ?',[newData,idProveedor]);
    req.flash('success', 'El proveedor ha sido actualizado correctamente');
    res.redirect('/proveedor');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible actualizar el proveedor');
    res.redirect('/proveedor');
  }

};
controlador.confirmarProveedorProducto = async function(req, res){
  try {
    const idProveedorProducto = req.params.idProveedorProducto;
    const newData = req.body;
    await pool.query('update proveedorproducto set ? where idProveedorProducto = ?',[newData,idProveedorProducto]);
    req.flash('success', 'El registro ha sido actualizado correctamente');
    res.redirect('/proveedorProducto');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible actualizar el registro');
    res.redirect('/proveedorProducto');
  }
};
controlador.confirmarRuta = async function(req, res){
  try {
    const idRuta = req.params.idRuta;
    const newData= req.body;
    await pool.query('update ruta set ? where idRuta = ?',[newData,idRuta]);
    req.flash('success', 'La ruta ha sido actualizada correctamente');
    res.redirect('/rutas');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible actualizar la ruta');
    res.redirect('/rutas');
  }
};
controlador.confirmarBodega = async function(req, res){
  try {
    const idBodega = req.params.idBodega;
    const newData = req.body;
    await pool.query('update bodega set ? where idBodega = ?',[newData,idBodega]);

    req.flash('success', 'La informacion de la bodega ha sido actualizada correctamente');
    res.redirect('/bodega');
  } catch (e) {
    console.log("ERROR:  "+e);
    req.flash('unsuccess', 'No ha sido posible actualizar la informacion de la bodega');
    res.redirect('/bodega');
  }
}
controlador.confirmarPermiso = async function(req, res){

  try{
    const idPedido = req.params.idPermiso;
    const data = req.body;
    await pool.query('update permiso set ? where idPermiso = ? ', [data,idPedido]);
    req.flash('success', 'El permiso ha sido actualizado correctamente');
    res.redirect('/permiso');
  }catch(e){
    console.error(e);
    req.flash('unsuccess', 'No ha sido posible actualizar el permiso');
    res.redirect('/permiso');
  }

}
//Fin metodos update

//metodo de delete de todas las tablas
controlador.eliminar = async function(req, res){
  try {
    const data = req.params.idCliente;
    await pool.query('delete from cliente where idCliente = ?',[data]);
    req.flash('success', 'El cliente ha sido eliminada correctamente');
    res.redirect('/cliente');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible eliminar al cliente');
    res.redirect('/cliente');
  }

};
controlador.eliminarConductor = async function(req, res){
  try {
    const data = req.params.idConductor;
    await pool.query('delete from conductor where idConductor = ?',[data]);
    req.flash('success', 'El conductor ha sido eliminado correctamente');
    res.redirect('/conductor');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible eliminar el conductor');
    res.redirect('/conductor');
  }

}
controlador.eliminarConductorR = async function(req, res){
  try {

    const data = req.params.idConductorRuta;
    await pool.query('delete from conductorruta where idConductorRuta = ?',[data]);
    req.flash('success', 'La planilla ha sido eliminada correctamente');
    res.redirect('/conductorRuta');

  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible eliminar la planilla');
    res.redirect('/conductorRuta');
  }

};
controlador.eliminarMarca = async function(req, res){
  try {
    const data = req.params.idMarca;
    await pool.query('delete from marca where idMarca = ?',[data]);
    req.flash('success', 'La marca ha sido eliminada correctamente');
    res.redirect('/marca');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible eliminar la marca');
    res.redirect('/marca');
  }

};
controlador.eliminarProducto = async function(req, res){
  try{
    const data = req.params.idProducto;
    await pool.query('delete from producto where idProducto = ?',[data]);
    req.flash('success', 'El producto ha sido eliminado correctamente');
    res.redirect('/producto');
  }catch(e){
    req.flash('unsuccess', 'No ha sido posible eliminar el producto');
    res.redirect('/producto');
  }

};
controlador.eliminarCosto = async function(req, res){
  try{
    const data = req.params.idCosto;
    await pool.query('delete from costo where idCosto = ?',[data]);
    req.flash('success', 'El costo ha sido eliminado correctamente');
    res.redirect('/costo');
  }catch(e){
    req.flash('unsuccess', 'No ha sido posible eliminar el costo');
    res.redirect('/costo');
  }

};
controlador.eliminarRuta = async function(req,res){
  try{
    const data = req.params.idRuta;
    await pool.query('delete from ruta where idRuta = ?',[data]);
    req.flash('success', 'La ruta ha sido eliminada correctamente');
    res.redirect('/rutas');
  }catch(e){
    req.flash('unsuccess', 'No se ha sido posible eliminar la ruta');
    res.redirect('/rutas');
  }

};
controlador.eliminarProveedor = async function(req,res){
  try {
    const data = req.params.idProveedor;
    await pool.query('delete from proveedor where idProveedor = ?',[data]);
    req.flash('success', 'El proveedor ha sido eliminado correctamente');
    res.redirect('/Proveedor');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible eliminar al proveedor');
    res.redirect('/Proveedor');
  }

};
controlador.eliminarProveedorProducto = async function(req, res){
  try {

    const data = req.params.idProveedorProductor;
    await pool.query('delete from proveedorproducto where idProveedorProducto = ?',[data]);
    req.flash('success', 'El elemento del inventario ha sido eliminado correctamente');
    res.redirect('/proveedorProducto');

  } catch (e) {

    req.flash('unsuccess', 'No ha sido posible eliminar el elemento del inventario');
    res.redirect('/proveedorProducto');

  }

};
controlador.eliminarPermiso = async function(req, res){
  try{

    const data = req.params.idPermiso;
    await pool.query('delete from permiso where idPermiso = ?', [data]);
    req.flash('success','El permiso ha sido eliminado correctamente');
    res.redirect('/permiso');

  }catch(e){
    req.flash('unsuccess','No ha sido posible eliminar el permiso');
    res.redirect('/permiso');
  }
}
//Fin metodo delete.s

//Metodos de permisos

controlador.permisosCliente = async function(req, res){

  try{

    const idCliente = req.params.idCliente;

    const data = await pool.query('select idPermiso, url from permisocliente inner join permiso on FK_idPermiso = idPermiso where FK_idCliente = ? ', [idCliente]);
    const permisos = await pool.query('select * from permiso');

    res.render('permisoscliente',{
      "idCliente" : idCliente,
      "data": data,
      "permisos": permisos
    });

  }catch(e){
    console.error(e);
    req.flash('unsuccess','Ocurrió algo inesperado');
    res.redirect('/cliente');
  }

}

controlador.guardarPermisosCliente = async function(req, res){
  try{

    const data = req.body;
    data.FK_idCliente = req.params.idCliente;
    console.log(data);

    await pool.query('insert into permisocliente set ?', [data]);

    req.flash('success','El permiso fue guardado correctamente');
    res.redirect('/cliente');

  }catch(e){
    console.error(e);
    req.flash('unsuccess','No ha sido posible guardar el permiso');
    res.redirect('/cliente');
  }
}

controlador.eliminarPermisosCliente = async function(req, res){
  try{

    const idCliente = req.params.idCliente;
    const idPermiso = req.params.idPermiso;

    await pool.query('delete from permisocliente where FK_idCliente = ? and FK_idPermiso = ?', [idCliente, idPermiso]);

    req.flash('success','El permiso fue eliminado correctamente');
    res.redirect('/cliente')

  }catch(e){
    console.error(e);
    req.flash('unsuccess','No ha sido posible eliminar el permiso');
    res.redirect('/cliente');
  }
}
controlador.eliminarBodega = async function(req, res){
  try {
    const data = req.params.idBodega;
    await pool.query('delete from bodega where idBodega = ?',[data]);
    req.flash('success', 'La bodega ha sido eliminada correctamente');
    res.redirect('/bodega');
  } catch (e) {
    req.flash('unsuccess', 'No ha sido posible eliminar la bodega');
    res.redirect('/bodega');
  }

};

// METODOS REPORTES Y PDF
controlador.reportes= async function(req,res){
  res.render('Reportes', {
    CP: null,
    CiudadC: null,
    CR: null,
    CC: null,
    BUTTON: null
  });
}
controlador.traerReporte=async function(req,res){
  var reporte = req.body.reporte;
  if(reporte==1){
    const clienteCompra = await pool.query('SELECT * FROM ventasxcliente');
    res.render('Reportes', {
      CP: clienteCompra,
      CiudadC: null,
      CR: null,
      CC: null,
      BUTTON: true
    });
  }else if(reporte==2){
    const CiudadCompra = await pool.query('SELECT * FROM ventasxciudad');
    res.render('Reportes', {
      CP: null,
      CiudadC: CiudadCompra,
      CR: null,
      CC: null,
      BUTTON: true
    });
  }else if(reporte==3){
    const ConductorRuta = await pool.query('SELECT * FROM conductoresarutas');
    res.render('Reportes', {
      CP: null,
      CiudadC: null,
      CR: ConductorRuta,
      CC: null,
      BUTTON: true
    });
  }else if(reporte==4){
    const ClienteCiudad= await pool.query('SELECT * FROM clientescxruta');
    res.render('Reportes', {
      CP: null,
      CiudadC: null,
      CR: null,
      CC: ClienteCiudad,
      BUTTON: true
    });
  }else{
    res.render('Reportes', {
      CP: null,
      CiudadC: null,
      CR: null,
      CC: null,
      BUTTON: null,
      unsuccess: 'No se ha seleccionado ningun reporte'
    });
  }
}
controlador.generatePDF= function(req,res){
    (
      async () => {

      let data=await generateHTML(req.params.reporte);

        let options = {
            "height": "11.25in",
            "width": "8.5in",
            "header": {
                "height": "20mm",
            },
            "footer": {
                "height": "20mm",
            },

        };

        let now= new Date();
        const month=now.getMonth()+1;
        const fecha= now.getDate()+'-'+month+'-'+now.getFullYear()+' '+now.getHours()+'-'+now.getMinutes()+'-'+now.getSeconds();
        const ruta = 'src/public/';
        const nom= 'reportes/reporte-'+fecha+'.pdf'
        pdf.create(data, options).toFile(ruta+nom, function (err, data) {
            if (err) {
                res.send(err);
            } else {
              res.render('Reportes', {
                pdf: nom,
                CP: null,
                CiudadC: null,
                CR: null,
                CC: null,
                BUTTON: null,
                success: 'Se ha generado el PDF correctamente'
              });
            }
        });

      }
      )()
}
async function generateHTML(opc){
  var data="<head>"+
      "<style>"+
        "table{ text-align: center; border-collapse: collapse; width:100%;}"+
        "th,td{padding: 20px;}"+
        "thead{background-color: #246355; border-bottom: solid 5px #0F362D;}"+
        "tr:nth-child(even){background-color: #ddd;}"+
      "</style>";
  if(opc==1){
    const clienteCompra = await pool.query('SELECT * FROM ventasxcliente');
  data+="<h1 style=\"margin:30px 150px;\">VALOR VENTAS POR CLIENTE</h1>"+
     "</head>"+
      "<body>"+
          "<table>"+
              "<thead>"+
                "<tr>"+
                    "<th>IdCliente</th>"+
                    "<th>Nombre</th>"+
                    "<th>Direccion</th>"+
                    "<th>Valor Acumulado</th>"+
                "</tr>"+
              "</thead>"+
            "<tbody>";
              for( var i=0; i < clienteCompra.length; i++){
                data+="<tr>"+
                  "<td>"+clienteCompra[i].idcliente+"</td>"+
                  "<td>"+clienteCompra[i].nombre+"</td>"+
                  "<td>"+clienteCompra[i].direccion+"</td>"+
                  "<td>"+clienteCompra[i].CP+"</td>"+
                  "</tr>";
              }
            data+="</tbody>"+
            "</table>"+
        "</body>";
  }else if(opc==2){
    const CiudadCompra = await pool.query('SELECT * FROM ventasxciudad');
    data+="<h1 style=\"margin:30px 150px;\">VALOR VENTAS POR CIUDAD</h1>"+
       "</head>"+
          "<body>"+
            "<table>"+
             "<thead>"+
                "<tr>"+
                  "<th>IdCiudad</th>"+
                  "<th>Nombre</th>"+
                  "<th>Valor Acumulado</th>"+
              "</tr>"+
            "</thead>"+
          "<tbody>";
            for( var i=0; i < CiudadCompra.length; i++){
              data+="<tr>"+
                "<td>"+CiudadCompra[i].idCiudad+"</td>"+
                "<td>"+CiudadCompra[i].nombre+"</td>"+
                "<td>"+CiudadCompra[i].CiudadP+"</td>"+
                "</tr>";
            }
          data+="</tbody>"+
          "</table>"+
        "</body>";
  }else if(opc==3){
    const ConductorRuta = await pool.query('SELECT * FROM conductoresarutas');
    data+="<h1 style=\"margin:30px 100px;\">CONDUCTORES ASIGNADOS A RUTAS</h1>"+
      "</head>"+
          "<body>"+
            "<table>"+
              "<thead>"+
                "<tr>"+
                  "<th>IdConductor</th>"+
                  "<th>Nombre</th>"+
                  "<th>idRuta</th>"+
                  "<th>Ruta</th>"+
                "</tr>"+
            "</thead>"+
          "<tbody>";
            for( var i=0; i < ConductorRuta.length; i++){
              data+="<tr>"+
                "<td>"+ConductorRuta[i].idConductor+"</td>"+
                "<td>"+ConductorRuta[i].cn+"</td>"+
                "<td>"+ConductorRuta[i].idRuta+"</td>"+
                "<td>"+ConductorRuta[i].nombre+"</td>"+
                "</tr>";
            }
          data+="</tbody>"+
          "</table>"+
        "</body>";
  }else if(opc==4){
    const ClienteCiudad= await pool.query('SELECT * FROM clientescxruta');
    data+="<h1 style=\"margin:30px 80px;\">CLIENTES CUBIERTOS POR CADA RUTA</h1>"+
      "</head>"+
          "<body>"+
             "<table>"+
                "<thead>"+
                    "<tr>"+
                      "<th>IdCliente</th>"+
                      "<th>Nombre</th>"+
                      "<th>Direccion</th>"+
                      "<th>idRuta</th>"+
                      "<th>Ruta</th>"+
                    "</tr>"+
                "</thead>"+
                "<tbody>";
                  for( var i=0; i < ClienteCiudad.length; i++){
                    data+="<tr>"+
                      "<td>"+ClienteCiudad[i].idCliente+"</td>"+
                      "<td>"+ClienteCiudad[i].nc+"</td>"+
                      "<td>"+ClienteCiudad[i].direccion+"</td>"+
                      "<td>"+ClienteCiudad[i].idRuta+"</td>"+
                      "<td>"+ClienteCiudad[i].nombre+"</td>"+
                      "</tr>";
                  }
          data+="</tbody>"+
          "</table>"+
        "<body>";
  }
  return data;
}
//FIN METODOS REPORTES Y PDF

module.exports = controlador;
