document.addEventListener('DOMContentLoaded', function(){

  document.querySelectorAll('.inputHideToggle').forEach((elem) => {
    elem.onchange = () => {

      if(elem.value === "true"){
          document.querySelector('.inputHide').style.display = "block";

          document.querySelectorAll('.inputHide input').forEach(function(ele){
            ele.setAttribute("required","");
          })

      }else{
          document.querySelector('.inputHide').style.display = "none";

          document.querySelectorAll('.inputHide input').forEach(function(ele){
            ele.removeAttribute("required");
          })
      }

    }
  });

  if(document.querySelector('#show-form') !== null){
    document.querySelector('#show-form').onclick = function(){
      if(this.getAttribute('data-on') == "false"){
        this.setAttribute('data-on', 'true');
        let tg = this.getAttribute('data-toggle');

        if(tg == "true"){
          document.querySelectorAll('.cardM-form').forEach(function(elem){

            let h = document.querySelector('#form-send').offsetHeight;
            document.querySelector("#show-form").style.backgroundImage = "url('../img/scrollUp.png')";
            elem.style.height = h+'px';
            elem.addEventListener('transitionend',function(){

              elem.removeEventListener('transitionend', arguments.callee);

              elem.style.height = 'max-content';
              document.querySelector('#show-form').setAttribute('data-on', "false");

            });
          });
          this.setAttribute('data-toggle','false');

        }else if(tg == "false"){

          /*
           * Obtengo la altura actual del formulario
           */
          let h = document.querySelector('#form-send').offsetHeight;
          /*
           * busco todos los elementos que tienen como clase a cardM-form
           */
          document.querySelectorAll('.cardM-form').forEach(function(elem){
            /*
             * guardo los estilos de la transición y le quito la transición
             */
            let transition = elem.style.transition;
            elem.style.transition = '';
            /*
             * cambio la imagen del link
             */
            document.querySelector("#show-form").style.backgroundImage = "url('../img/scroll.png')";
            elem.addEventListener('transitionend',function(){

              elem.removeEventListener('transitionend', arguments.callee);
              document.querySelector('#show-form').setAttribute('data-on', "false");

            });
            /*
             * en el siguiente frame de la animación le doy el height que tiene actualmente el div
             * y le doy los estilos de la transition
             */
            requestAnimationFrame(function() {
              elem.style.height = h + 'px';
              elem.style.transition = transition;
              /*
               * En el siguiente frame después de ejecutar lo de arriba
               * al elemento de doy una altura de 0px
               */
               /*
                * al realizar este cambio la animación se ejecutará automaticamente
                */
             requestAnimationFrame(function() {
               elem.style.height = 0 + 'px';
             });
           });

          });
          this.setAttribute('data-toggle','true');
        }

      }

    }
  }



  document.querySelector('#menu-icon').onclick = function(){
    let state = document.querySelector("#menu-icon").dataset.toggle;

    if(state === "false"){
      document.querySelector("#nav").style.left = "0px";
      document.querySelector("#menu-icon").dataset.toggle = "true";
    }else if(state === "true"){
      document.querySelector("#nav").style.left = "-250px";
      document.querySelector("#menu-icon").dataset.toggle = "false";
    }

  }

  document.querySelector('#user-options').onclick = function(){
    let state = document.querySelector("#user-options").dataset.toggle;

    if(state === "false"){
      document.querySelector("#popUp-user-options").style.display = "flex";
      document.querySelector("#user-options").dataset.toggle = "true";
    }else if(state === "true"){
      document.querySelector("#popUp-user-options").style.display = "none";
      document.querySelector("#user-options").dataset.toggle = "false";
    }

  }

  document.querySelectorAll(".select-ajx").forEach(function(elem){
    elem.onchange = function(){
      let ruta = elem.dataset.call;
      let result = elem.dataset.result;
      let dataName = elem.dataset.dname;
      let data = elem.value;
      let dataTemplate = elem.dataset.template;
      console.log(dataName);
      cleanSelect(result);
      selectAjx(ruta, dataName, data, result, dataTemplate);
    }
  });
});


/*
 * funcion que realiza la peticion ajax del select
 */
 function selectAjx(ruta, dataName, data, result, dataTemplate){
   const request = new XMLHttpRequest();
   request.open('POST', ruta);
   request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
   request.onload = function(){
      const data = JSON.parse(request.responseText);

      if(data.status){
        selectRes(data.data, result, dataTemplate);
      }
   }

   request.send(dataName+'='+data);
 }

/*
 * funcion que agrega los valores devueltos de la peticion ajax en el <select>
 */

 function selectRes(data, result, dataTemplate){
   console.log(data);
   const template = Handlebars.compile(document.querySelector(dataTemplate).innerHTML);
   const res = template({
     data: data
   });
   document.querySelector(result).innerHTML += res;
 }

 /*
  * funcion que borra los elementos del select
  */

  function cleanSelect(result){
    //let children = document.querySelector(result + " > option:nth-child(1)");

    let children = document.querySelector(result);

    for(let i = (children.childNodes.length - 1); i > 1; i--){
      children.removeChild(children.childNodes[i]);
    }

  }
