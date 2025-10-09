// Script sencillo para Problemas 1 y 3
document.addEventListener('DOMContentLoaded', function() {
  /* ===================== Problema 1: invertir palabras separadas por espacios ===================== */
  var input1 = document.getElementById("p1-input");
  var btn1 = document.querySelectorAll(".problema-button")[0];
  var output1 = document.getElementById("p1-output");

  btn1.addEventListener("click", function() {
    var texto = input1.value.trim();
    if (texto === "") {
      output1.textContent = "Por favor ingresa palabras separadas por espacios.";
      return;
    }
    // separa las palabras, invierte el orden y une con un espacio
    var palabras = texto.split(/\s+/);
    var invertidas = palabras.reverse().join(" ");
    output1.textContent = "Resultado: " + invertidas;
  });

  
  /* ===================== Problema 3: palabra con más caracteres únicos ===================== */
  var input3 = document.getElementById("p3-input");
  // Buscamos el tercer contenedor de problema y su botón
  var contenedores = document.querySelectorAll(".Problema-container");
  var c3 = contenedores[2];
  var btn3 = c3.querySelector(".problema-button");
  // Buscamos el output dentro del tercer contenedor
  var output3 = c3.querySelector(".problema-output");

  btn3.addEventListener("click", function() {
    var texto = input3.value.trim();
    if (texto === "") {
      output3.textContent = "Por favor ingresa palabras separadas por comas (sin espacios).";
      return;
    }

    // Solo se permiten letras mayúsculas y comas
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
