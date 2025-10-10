function soloNumerosDecimales(e, input) {
  var tecla = (document.all) ? e.keyCode : e.which;
  if (tecla == 8) return true; 

  var valor = input.value;
  var tecla_final = String.fromCharCode(tecla);

  if (tecla == 46) {
    if (valor.includes('.')) return false;
    if (valor.length === 0) return false; 
    return true;
  }

  if (!/[0-9]/.test(tecla_final)) return false;

  if (!valor.includes('.') && valor.length >= 2) return false;

  if (valor.includes('.')) {
    var decimales = valor.split('.')[1];
    if (decimales.length >= 2) return false;
  }

  return true;
}

function calcularCalificacion() {
  var p1 = parseFloat(document.getElementById("p1").value) || 0;
  var p2 = parseFloat(document.getElementById("p2").value) || 0;
  var p3 = parseFloat(document.getElementById("p3").value) || 0;
  var examen = parseFloat(document.getElementById("examen").value) || 0;
  var trabajo = parseFloat(document.getElementById("trabajo").value) || 0;

  if ([p1, p2, p3, examen, trabajo].some(v => v < 0 || v > 10)) {
    alert("Las calificaciones deben estar entre 0 y 10.");
    return;
  }

  var promedioParciales = (p1 + p2 + p3) / 3;
  var final = (promedioParciales * 0.55) + (examen * 0.30) + (trabajo * 0.15);

  document.getElementById("resultado").textContent =
    "Promedio de parciales: " + promedioParciales.toFixed(2) +
    "\nCalificación final: " + final.toFixed(2);
}

function borrar() {
  document.getElementById("p1").value = "";
  document.getElementById("p2").value = "";
  document.getElementById("p3").value = "";
  document.getElementById("examen").value = "";
  document.getElementById("trabajo").value = "";
  document.getElementById("resultado").textContent = "Esperando datos...";
}
