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
//Validacion letras 
var checkStr = formulario.nombre.value;
var abcOK = "ABCDEFGHIJKLMNÑOPQRSTUVWYZ" + "abcdefghijklmnñopqrstuvwxyz";
var allvalido = false ;

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

//VAlidacion letras 
var checkStr = formulario.edad.value;
var abcOK = "1234567890";

var allvalido = false ;

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
    alert ("Ingrese unicamente numeros  ")
    formulario.edad.focus();
    return false;

}


var b = /^[^@\s] + @[^@\.\s] + (\.[^@\.\s]+)+$/;
var txt = formulario.correo.value 

    alert ("Email" + (b.test(txt) ? " ": " no " )+ "valido");
    return b.test;



}


//Validar correo electronico q acepte todo alachingada 
//texto.texto@texto.texto }
