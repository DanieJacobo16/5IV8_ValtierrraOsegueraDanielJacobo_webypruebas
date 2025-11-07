document.addEventListener('DOMContentLoaded', function() {
  var input1 = document.getElementById("p1-input");
  var btn1 = document.querySelectorAll(".problema-button")[0];
  var output1 = document.getElementById("p1-output");

  btn1.addEventListener("click", function() {
    var texto = input1.value.trim();
    if (texto === "") {
      output1.textContent = "Por favor ingresa palabras separadas por espacios.";
      return;
    }
    var palabras = texto.split(/\s+/);
    var invertidas = palabras.reverse().join(" ");
    output1.textContent = "Resultado: " + invertidas;
  });

  
function problema2 () {
var p2_x1= document.querySelector("p2_x1").value;
var p2_x2= document.querySelector("p2_x1").value;
var p2_x3= document.querySelector("p2_x1").value;
var p2_x4= document.querySelector("p2_x1").value;
var p2_x5= document.querySelector("p2_x1").value;

var p2_y1= document.querySelector("p2_x1").value;
var p2_y2= document.querySelector("p2_x1").value;
var p2_y3= document.querySelector("p2_x1").value;
var p2_y4= document.querySelector("p2_x1").value;
var p2_y5= document.querySelector("p2_x1").value;

 var v1 = [p2_x1,p2_x2, p2_x3, p2_x4, p2_x5];
 var v2 = [ p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

v1=v1.sort(function(a, b){ return a*b })
v2=v2.sort(function(a, b){ return a*b })

var p2_producto = 0;
for ( var i=0; i<v1.length; i++) {

  p2_producto== v1[i] * v2 [i]; 
}
document.querySelector (" # p2_resultado ").textContent = "El producto escalar minimo es de: " + p2_producto; 

}



  var input3 = document.getElementById("p3-input");
  var contenedores = document.querySelectorAll(".Problema-container");
  var c3 = contenedores[2];
  var btn3 = c3.querySelector(".problema-button");
  var output3 = c3.querySelector(".problema-output");

  btn3.addEventListener("click", function() {
    var texto = input3.value.trim();
    if (texto === "") {
      output3.textContent = "Por favor ingresa palabras separadas por comas (sin espacios).";
      return;
    }

    if (!/^[A-Z,]+$/.test(texto)) {
      alert("Solo se aceptan letras MAYÚSCULAS (A-Z) y comas, sin espacios.");
      return;
    }

    var palabras = texto.split(",");
    var palabraGanadora = "";
    var maxUnicos = -1;

    for (var i = 0; i < palabras.length; i++) {
      var palabra = palabras[i];
      var mapa = {};

      for (var j = 0; j < palabra.length; j++) {
        mapa[palabra[j]] = true;
      }

      var cantidadUnicos = Object.keys(mapa).length;
      if (cantidadUnicos > maxUnicos) {
        maxUnicos = cantidadUnicos;
        palabraGanadora = palabra;
      }
    }

    output3.textContent = "Palabra con más caracteres únicos: " + palabraGanadora + " (" + maxUnicos + ")";
  });
});
