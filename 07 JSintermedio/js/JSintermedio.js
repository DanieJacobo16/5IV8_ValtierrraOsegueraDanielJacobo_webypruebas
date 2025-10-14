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

// Nos aqyudan a pooder realizar operraciones de una forma muchao mas sencilla conforma la siguiente estructura
// cadena => id,clase, metodo, nombre, atributo
/* 
const suma = (n1, n2) => n1 + n2;
console.log(`Esta suma es de : ${suma(5, 6)}`);
*/

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

const indiceChihuahua = razasdeperros.findIndex(raza => raza  === "chihuahua");
if (indiceChihuahua >= -1) {
    //Si se encontro y esta dentro del arreglo
  console.log(razasdeperros[indiceChihuahua]);
  //Voy a poner texto a este resultado
    razasdeperros[indiceChihuahua] += "(Chihuahua toy)";
    console.log(razasdeperros[indiceChihuahua]);
    console.log(razasdeperros);

}


