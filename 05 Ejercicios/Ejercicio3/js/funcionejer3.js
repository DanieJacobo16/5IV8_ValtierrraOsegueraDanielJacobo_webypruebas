function soloNumerosDecimales(e, input) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true; 

    if (tecla == 46) {
        if (input.value.includes('.')) return false;
        return true;
    }

    var patron = /[0-9]/;
    var tecla_final = String.fromCharCode(tecla);

    if (!patron.test(tecla_final)) return false;

    var valor = input.value;
    if (valor.includes('.')) {
        var decimales = valor.split('.')[1];
        if (decimales.length >= 2) return false;
    }

    return true;
}

function calcularDescuento() {
    var precio = document.getElementById("precio").value;

    if (precio === "" || isNaN(precio)) {
        alert("Por favor ingresa un número válido.");
        return;
    }

    var parseo = parseFloat(precio);
    var descuento = parseo * 0.05;
    var total = parseo - descuento;

    document.getElementById("descuento").value = "$ " + descuento.toFixed(2);
    document.getElementById("total").value = "$ " + total.toFixed(2);
}

function borrar() {
    document.getElementById("precio").value = "";
    document.getElementById("descuento").value = "";
    document.getElementById("total").value = "";
}
