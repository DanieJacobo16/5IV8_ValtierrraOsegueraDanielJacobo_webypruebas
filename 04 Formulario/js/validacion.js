/* 
0JavaScript es un lenguaje multiparadigma 
Acpeta programacion funcional funcional, estructurada, orientada a eventos y a POO,
Dentro de jsno existe el typado de variables,
NO EXISTE EL int, string, float, etc
De acuerdo al estandar ES6 SON 
var , let y const 

*/
function validar (formulario) {
    //Validar q el campo no me acepte mas de 3 caracteres/
    if (formulario.nombre.value.lenght < 3 ) {
        alert("Por favor escribe mas de 3 caracteres en el campo nombre");
        formulario.nombre.focus ();
        return false ;
    }
//VAlidacion letras 
var checkStr = formulario.nombre.value;
alert (checkStr);
var abcOK = "abcdefghijklmnñopqrstuvwxyz" + "ABCDEFGHIJKLMNÑOPQRSTUVWYZ" + "áéíóú" + " ";

var allvalido = true ;

//Tenemos q comparar cadena de nombre con el resultado de abc 
for( var i=0; checkStr.lenght; i++){
    var caracteres=checkStr.charArt(i);
    for(var j=0; j< abcOK.length; j++){
        if (caracteres==abcOK.charAt(j))
            break;
        }
if(j==abcOK.length) {
    allvalido=false;
    break;
}

}
if (allvalido){
    alert ("Ingresar un nombre valido ")
    formulario.nombre.focus();
    return false;

}
}