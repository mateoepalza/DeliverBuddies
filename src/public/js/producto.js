$(function(){

  /*
   * Open an close the menu
   */

  $("#menu-icon").click(function(){

    if($("#menu-icon").data("toggle") === "false"){

      $("#nav").css({
        "left" : "0px"
      });

      $("#menu-icon").data("toggle","true");

    }else{

      $("#nav").css({
        "left" : "-250px"
      });

      $("#menu-icon").data("toggle","false");

    }

  });

  /*
   * Open an close the cart
   */

  $("#logo-carrito").click(function(){

    $("#carrito").css({
      "right" : "0px"
    });

    $("#shadow-carrito").fadeIn("slow");

  });
  $("#shadow-carrito").click(function(){
    $("#carrito").css({
      "right" : "-450px"
    });
    $("#shadow-carrito").fadeOut("slow");
  });

  $("#close-carrito").click(function(){
    $("#carrito").css({
      "right" : "-450px"
    });
    $("#shadow-carrito").fadeOut("slow");
  });

  $("#carrito-container").on('click','.comprar-delete', function(){
    ($(this).parentsUntil("#carrito-container")).remove();
  })

  /*
   * Open an close the log out
   */
   $("#user-options").click(function(){
     let state = $("#user-options").data("toggle");

     if(!state){
       $("#popUp-user-options").css({"display":"flex"});
       $("#user-options").data("toggle",true);
     }else if(state){
       $("#popUp-user-options").css({"display":"none"});
       $("#user-options").data("toggle",false);
     }
   })
   
});
