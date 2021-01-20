
/*
 * I define de variable that will tell the event 'animationend' to execute or not
 */
let hide = false;


document.addEventListener('DOMContentLoaded', () => {

  document.querySelectorAll('.popUp').forEach(function(element){
    element.onclick = function(){
      const title = element.dataset.title;
      const url = element.dataset.uri;
      const data = element.dataset.id;
      const thead = (element.dataset.thead).split(",");
      console.log(thead);
      popUp(url, title, data, thead);

      return false;
    }
  });

  /*
   * Everytime i click "#shadow" i call the animation hide
   */
  document.querySelector("#shadow").onclick = function(){
    hide = true;
    animationHide();
  }

});



/*
 * popUp -> hago la peticion POST al servidor y espero por la respuesta
 */
function popUp(url, title, data, thead){
  const request = new XMLHttpRequest();
  request.open('POST',url);
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.onload = function(){
    const tbody = JSON.parse(request.responseText);
    if(tbody.status){
      alerting(title, tbody.productos, thead);
    }
  }
  request.send('idTable='+data);
}


/*
 * alerting -> alerting recibe el thead y el tbody y coloca la informacion en el template
 */
function alerting(title, tbody, thead){
  const template = Handlebars.compile(document.querySelector('#mas').innerHTML);
  console.log(tbody);
  const res = template({
    "title" : title,
    "body" : tbody,
    "head" : thead
  });

  document.querySelector("#shadow-container").innerHTML += res;

  animationShow();
}

/*
 * The animations for the show and hide of the div
 */

function animationShow(){
  document.querySelector("#shadow").style.animationName = "show";
  document.querySelector("#shadow").style.animationPlayState = "running";
  document.querySelector("#shadow").style.display = "flex";
}

function animationHide(){
  document.querySelector("#shadow").style.animationName = "hide";
  document.querySelector("#shadow").style.animationPlayState = "running";
  document.querySelector("#shadow").addEventListener('animationend', function(){
    if(hide){
      document.querySelector("#shadow").style.display = "none";
      document.querySelectorAll(".table-remove").forEach(function(element){
        element.remove();
      })
      document.querySelector("#shadow").style.animationPlayState = "paused";
      hide = false;
    }
  });
}
