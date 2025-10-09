function soloNumeros(e) {
    var tecla = (document.all) ? e.keyCode : e.which;
    if (tecla == 8) return true; 
    var patron = /[0-9]/; 
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
}

function calcular() {
    var hombres = parseInt(document.getElementById("hombres").value);
    var mujeres = parseInt(document.getElementById("mujeres").value);

    if (isNaN(hombres) || isNaN(mujeres) || hombres < 0 || mujeres < 0) {
        alert("Por favor, ingresa solo números válidos en ambos campos.");
        return;
    }

    var total = hombres + mujeres;
    if (total === 0) {
        alert("No se puede calcular el porcentaje con valores en cero.");
        return;
    }

    var porH = (hombres / total) * 100;
    var porM = (mujeres / total) * 100;

    document.getElementById("porH").value = porH.toFixed(2) + " %";
    document.getElementById("porM").value = porM.toFixed(2) + " %";
}

function borrar() {
    document.getElementById("hombres").value = "";
    document.getElementById("mujeres").value = "";
    document.getElementById("porH").value = "";
    document.getElementById("porM").value = "";
}
