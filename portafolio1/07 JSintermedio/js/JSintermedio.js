/*
var x = hola
if (true) { 
    let x = "Habia una vez"

} 

console.log(x)
*/
/* 
function suma (n1, n2) {
    return n1 + n2
}
console.log ( `Esta suma es de : ${suma(5, 6)}`);
 
*/

// La funcion flecha Nos ayudan a pooder realizar operaciones de una forma muchao mas sencilla conforma la siguiente estructura
// cadena => id,clase, metodo, nombre, atributo
/* 
const suma = (n1, n2) => n1 + n2;
console.log(`Esta suma es de : ${suma(5, 6)}`);
*/

/*
const razasdeperros= [ 
    "labrador",
    "pastor aleman",
    "bulldog" ,
    "chihuahua",
    "salchicha",
    "poodle"
]
   // Formas de imprimir y recorrer un array
   // for clasicco
    /*
   for (let i = 0; i < razasdeperros.length; i++) {
    console.log(razasdeperros[i]);
   }

  */
 /*
   //for of 
 for (const raza of razasdeperros) {
    console.log(raza);
 }
 */

 /*

 // for in
    for (const i in razasdeperros) {
        console.log(razasdeperros[indice]);
    }

*/
/*
// El foreach itera sobre los elentos de un array y no devuelve nada
//Todos los forEach son funciones flecha por defecto
razasdeperros.forEach(raza => console.log(raza));
//La estructura general del forEach es la siguiente
// Argumento1.forEach((elemento (raza), indice, arrayOriginal) => {codigo a ejecutar})

razasdeperros.forEach((raza, indice, arrayOriginal) => { console.log (raza)} ) 

*/

 /*

// MAP -> Iterar sobre los elementos del array y devuelve un nuevo array diferente con el cual podemos jugar +
 const razasdePerrosMAyusculas = razasdeperros.map(raza => raza.toUpperCase());
 console.log(razasdePerrosMAyusculas);

*/

// FIND nospermite buscar un elemento dentro de un array y devuelve el primer elemento que cumpla con la condicion, sino lanza un undefined


 /*
if(razasdeperros.find(raza => raza === "chihuahua")) {
    console.log("Si se encuentra la raza");
    console.log (razasdeperros);
} 
else {
 razasdeperros.push("chihuahua");
console.log(razasdeperros);

}

*/

// FINDINDEX -> Nos permite buscar un elemento dentro de un array y devuelve el indice del primer elemento que cumpla 
// con la condicion, sino lanza un -1, esta funcion es muy util para modificar/eliminar elementos de un array original, 
// dentro de una copia del mismo 

/*
const indiceChihuahua = razasdeperros.findIndex(raza => raza  === "chihuahua");
if (indiceChihuahua >= -1) {
    //Si se encontro y esta dentro del arreglo
  console.log(razasdeperros[indiceChihuahua]);
  //Voy a poner texto a este resultado
    razasdeperros[indiceChihuahua] += "(Chihuahua toy)";
    console.log(razasdeperros[indiceChihuahua]);
    console.log(razasdeperros);

}

*/

// Repuestas a los ejercicios

//  Validar solo números enteros
const soloNumeros = e => {
    const key = e.keyCode || e.which;
    const tecla = String.fromCharCode(key);
    const patron = /[0-9]/;
    return patron.test(tecla);
};

//  Problema 1
const problema1 = () => {
    const n1 = parseInt(document.getElementById("num1").value);
    const n2 = parseInt(document.getElementById("num2").value);
    let resultado = 0;

    if (isNaN(n1) || isNaN(n2)) {
        document.getElementById("res1").innerText = "Por favor ingresa ambos números.";
        return;
    }

    if (n1 === n2) resultado = n1 * n2;
    else if (n1 > n2) resultado = n1 - n2;
    else resultado = n1 + n2;

    document.getElementById("res1").innerText = `Resultado: ${resultado}`;
};

//  Problema 2
const problema2 = () => {
    const nums = [
        parseInt(document.getElementById("n1").value),
        parseInt(document.getElementById("n2").value),
        parseInt(document.getElementById("n3").value)
    ];

    if (nums.some(isNaN)) {
        document.getElementById("res2").innerText = "Por favor ingresa los tres números.";
        return;
    }

    let mayor = nums[0];
    for (let i = 1; i < nums.length; i++) if (nums[i] > mayor) mayor = nums[i];

    document.getElementById("res2").innerText = `El número mayor es: ${mayor}`;
};


//  Problema 3
const problema3 = () => {
    const horas = parseInt(document.getElementById("horas").value);
    const pago = parseFloat(document.getElementById("pago").value);

    if (isNaN(horas) || isNaN(pago)) {
        document.getElementById("res3").innerText = "Ingresa valores válidos.";
        return;
    }

    let total = 0;
    if (horas <= 40) total = horas * pago;
    else {
        const extras = horas - 40;
        if (extras <= 8) total = (40 * pago) + (extras * pago * 2);
        else total = (40 * pago) + (8 * pago * 2) + ((extras - 8) * pago * 3);
    }

    document.getElementById("res3").innerText = `Pago total: $${total.toFixed(2)}`;
};

//  Problema 4
const problema4 = () => {
    const salario = parseFloat(document.getElementById("salario").value);
    const años = parseInt(document.getElementById("antiguedad").value);

    if (isNaN(salario) || isNaN(años)) {
        document.getElementById("res4").innerText = "Completa todos los campos.";
        return;
    }

    const porcentaje = años < 1 ? 0.05 :
        años < 2 ? 0.07 :
        años < 5 ? 0.10 :
        años < 10 ? 0.15 : 0.20;

    const utilidad = salario * porcentaje;

    document.getElementById("res4").innerText = 
        `Utilidad: $${utilidad.toFixed(2)} (${(porcentaje * 100)}%)`;
};
