document.addEventListener('DOMContentLoaded', function(){

  document.querySelector('#form-send').onsubmit = function(elem){

    let arr = document.querySelectorAll('#form-send input');

    template = Handlebars.compile(document.querySelector('#alertDanger').innerHTML);

    arr.forEach(function(ele){
      ele.onchange = function(){
        ele.classList.remove("incorrectValue");
      }
    });

    for (let obj of arr) {
      let tipo = obj.dataset.tipo;
      let val = obj.value;

      if(tipo === 'text'){
        if(! /^[a-zA-Z_áéíóúñÑ\s\-]*$/.test(val)){

          let tem = template({
            "data": "Recuerde que debe ingresar solo letras"
          });

          mostrarMensaje(obj, tem);

          return false;
        }
      }else if(tipo === 'number'){
        if(!/^[0-9]*$/.test(val)){

          let tem = template({
            "data": "Recuerde que debe ingresar solo números"
          });
          mostrarMensaje(obj, tem);
          return  false;
        }

      }else if(tipo === 'date'){
        if(!/^\d{4}([\-/.])(0?[1-9]|1[0-2])\1(3[01]|[12][0-9]|0?[1-9])$/.test(val)){

          let tem = template({
            "data": "Fecha invalida"
          });

          mostrarMensaje(obj, tem);

          return false;
        }

      }else if(tipo === 'email'){

        if(! /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/.test(val)){

          let tem = template({
            "data": "Correo invalido"
          });

          mostrarMensaje(obj, tem);

          return false;
        }

      }else if(tipo === 'address'){
        if(!/^[A-Za-z0-9_#\-\.º\s]*$/.test(val)){

          let tem = template({
            "data": "Dirección invalida"
          });

          mostrarMensaje(obj, tem);

          return false;
        }
      }else if(tipo === 'between-number'){
        let min = parseInt(obj.dataset.min);
        let max = parseInt(obj.dataset.max);

        if(!/^[0-9]*$/.test(val)){

          let tem = template({
            "data": "Recuerde que debe ingresar solo números"
          });

          mostrarMensaje(obj, tem);

          return  false;
        }else{
          if(val < min || val > max){
            let tem = template({
              "data": `Recuerde que el valor mínimo es ${min} y el valor máximo es ${max}`
            });

            mostrarMensaje(obj, tem);

            return  false;
          }
        }

      }else if(tipo === 'password'){

        con = obj.value;
        recon = document.querySelector('#repassword').value;

        if(recon != con){

          let tem = template({
            "data": `Las contraseña no coinciden, por favor intente de nuevo`
          });

          mostrarMensaje(obj, tem);

          return false;
        }
      }

    }



  };

});

function mostrarMensaje(obj,tem){


  document.querySelector("#mostrar-alert").innerHTML = tem;
  document.querySelector("#a-danger").style.display = "flex";

  obj.classList.add("incorrectValue");

}
