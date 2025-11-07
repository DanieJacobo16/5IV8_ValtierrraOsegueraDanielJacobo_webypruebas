function validarNum(e) {
    var teclado = (document.all) ? e.keyCode : e.which;
    if (teclado == 8) return true; // permitir borrar
  
    // Solo números y punto
    var patron = /[0-9.]/;
    var tecla_final = String.fromCharCode(teclado);
    if (!patron.test(tecla_final)) {
      return false;
    }
  
    // Limitar a 2 decimales
    var input = e.target.value;
    if (tecla_final === "." && input.includes(".")) return false; // solo un punto
    if (input.includes(".")) {
      var decimales = input.split(".")[1];
      if (decimales.length >= 2) return false;
    }
  }
  
  function calcular() {
    var sBase = parseFloat(document.getElementById("sueldoBase").value) || 0;
    var v1 = parseFloat(document.getElementById("venta1").value) || 0;
    var v2 = parseFloat(document.getElementById("venta2").value) || 0;
    var v3 = parseFloat(document.getElementById("venta3").value) || 0;
  
    var comision1 = v1 * 0.15;
    var comision2 = v2 * 0.15;
    var comision3 = v3 * 0.15;
  
    var totalComision = comision1 + comision2 + comision3;
    var sueldoFinal = sBase + totalComision;
  
    // Mostrar con 2 decimales
    document.getElementById("comisionTotal").value = "$ " + totalComision.toFixed(2);
    document.getElementById("sueldoFinal").value = "$ " + sueldoFinal.toFixed(2);
  }
  
  function borrar() {
    document.getElementById("sueldoBase").value = "";
    document.getElementById("venta1").value = "";
    document.getElementById("venta2").value = "";
    document.getElementById("venta3").value = "";
    document.getElementById("comisionTotal").value = "";
    document.getElementById("sueldoFinal").value = "";
  }
  