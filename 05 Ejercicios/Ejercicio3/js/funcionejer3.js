function validarNum(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true; 
  
    var patron = /[0-9.]/;
    var tecla_final = String.fromCharCode(teclado);
    if (!patron.test(tecla_final)) {
      return false;
    }
  
    var input = e.target.value;
    if (tecla_final === "." && input.includes(".")) return false; 
    if (input.includes(".")) {
      var decimales = input.split(".")[1];
      if (decimales.length >= 2) return false;
    }
  }
  
  function calcular() {
    var precio = parseFloat(document.getElementById("precio").value) || 0;
  
    var descuento = precio * 0.05;
    var total = precio - descuento;

    document.getElementById("descuento").value = "$ " + descuento.toFixed(2);
    document.getElementById("total").value = "$ " + total.toFixed(2);
  }
  
  function borrar() {
    document.getElementById("producto").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("descuento").value = "";
    document.getElementById("total").value = "";
  }
  