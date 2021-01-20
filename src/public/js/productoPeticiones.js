/*
 * cuando el documento esté cargado se va a ejecutar lo siguiente
 */
$(function(){
  /*
   * La siguiente funcion se encarga de buscar todos los productos existentes en la base de datos y los devuelve en formato JSON
   */
  $.get("/usuario/getProducts", function(data){
    /*
     * handlebars es un motor de vistas que me permite generar un template en el lado del cliente
     */
    let template = Handlebars.compile($("#productArticle").html());
    let products = data.products;
    for(var i=0; i < products.length; i++){
      /*
       * mando las variables para el template
       */
      const res = template({
        "data" : products[i],
        "pos" : (i+1)
      })
      /*
       * Inserto el resultado del template a el div con id #insert-productos
       */
      $("#insert-productos").append(res);
      /*
       * Coloco la imagen del producto al div
       */
      $("#pro"+(i+1)).css({
        "background-image": "url('../img/productos/"+products[i].urlImage+"')"
      });
    }
  });
  /*
   * This will see if there are products in the cart
   */
  $.get("/usuario/getAllProducts", function(data){

    let template = Handlebars.compile($("#productoCarrito").html());
    let products = data.productos;

    for(var i=0; i < products.length; i++){

      var id =(products[i].nombre).replace(" ","")+products[i].idProducto;
      products[i].id= id;

      const res = template({
        'data' : products[i]
      })

      $("#carrito-container").append(res);
      $("#"+id).css({
        "background-image": "url('../img/productos/"+products[i].urlImage+"')"
      })
      updatePrice();
    }
  });
  /*is the only way to put an action listner 'click' to html elements created dinamically*/
  $("#insert-productos").on("click",".agregarCarrito",function(){
    var attr = $(this).attr('data-id');
    $.get("/usuario/getProduct", {"id":attr} , function(data){

      var id = data[0].nombre.replace(/ /g, "")+data[0].idProducto;

      data[0].id= id;

      let template = Handlebars.compile($('#productoCarrito').html());
      let res = template({
        'data':data[0]
      });
      
      $("#carrito-container").append(res);
      $("#"+id).css({
        "background-image": "url('../img/productos/"+data[0].urlImage+"')"
      })
      updatePrice();
    });

  });

  $("#searchB").change(function(){

    $("#filtroSelect").val(0);
    $("#insert-productos").html("");

    var attr = $("#searchB").val();
    $.get("/usuario/getSearchProducts",{"nombre":attr}, function(data){

      let template = Handlebars.compile($("#productArticle").html());
      let products = data.products;

      for(var i=0; i < products.length; i++){

        const res = template({
          "data" : products[i],
          "pos" : (i+1)
        })

        $("#insert-productos").append(res);
        $("#pro"+(i+1)).css({
          "background-image": "url('../img/productos/"+products[i].urlImage+"')"
        });
      }
    });
  });

  $("#filtroMarca").click(function(){

    $("#searchB").val("");
    $("#insert-productos").html("");

    var attr = $("#filtroSelect").val();

    let add = "";
    if(attr != 0){
      add = "getSearchProductsMarca";
    }else{
      add = "getProducts"
    }

    $.get("/usuario/"+add, {"idMarca":attr}, function(data){

      let template = Handlebars.compile($("#productArticle").html());
      let products = data.products;

      for(var i=0; i < products.length; i++){

        const res = template({
          "data" : products[i],
          "pos" : (i+1)
        })

        $("#insert-productos").append(res);
        $("#pro"+(i+1)).css({
          "background-image": "url('../img/productos/"+products[i].urlImage+"')"
        });
      }
    });


  });

  $("#tipo-envio").change(function(){

    var tipo = $(this).val();
    var fecha = new Date();
    fecha.setDate(fecha.getDate() +parseInt(tipo));
    $("#fecha-pedido").text(fecha.getDate() + "/" + (fecha.getMonth() +1 ) + "/" + fecha.getFullYear());

  });

  $("#carrito-container").on('click','.comprar-delete', function(){

    deleteLista(this);
  })

  $("#carrito-container").on('click',".cantMin", function(){
    var num = ($(this).next()).text();
    num--;
    if(num > 0){
      ($(this).next()).text(num);
      (($(this).parentsUntil("#carrito-container")).find(".mult-productos")).text(num);
      var id = ($(this).parents('.comprar-pro')).data('id');
      updateCant(id,num);
    }else{
      deleteLista(this);
      ($(this).parentsUntil("#carrito-container")).remove();

    }
  })
  $("#carrito-container").on('click','.cantMax', function(){
    var num = ($(this).prev()).text();
    num++;
    ($(this).prev()).text(num);
    (($(this).parentsUntil("#carrito-container")).find(".mult-productos")).text(num);
    var id = ($(this).parents('.comprar-pro')).data('id');
    updateCant(id,num);
  })
  function updateCant(id,num){
    $.get("/usuario/updateCantProduct",{"id":id,"cant":num}, function(data){

      if(data.status){

        updatePrice();

      }

    });
  }
  function deleteLista(att){
    var id = ($(att).parents('.comprar-pro')).data('id');
    $.get("/usuario/deleteProduct", {id}, function(data){

      if(data.status){
        updatePrice();
      }

    });
  }

  function updatePrice(){
    $.get("/usuario/updatePrice", function(data){

      $("#price").text(data.precio);

    });
  }

})
