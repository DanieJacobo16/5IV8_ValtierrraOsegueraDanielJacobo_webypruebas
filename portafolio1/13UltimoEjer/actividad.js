/**
 * @param {Function} fn
 * @return {Function}
 */
function memoize(fn) {
    const cache = {};
    
    return function(...args) {

        const key = JSON.stringify(args);
        
        if (key in cache) {
            return cache[key];
        }
        
        const result = fn(...args);
        cache[key] = result;
        
        return result;
    }
}

 
 let callCount = 0;
  const memoizedFn = memoize(function (a, b) {
    callCount += 1;
    return a + b;
 })
 memoizedFn(4, 3) // 5

 // funcion para calarla
function suma(a, b) {
    console.log("Calculando suma...");
    return a + b;
}

const memoizedSuma = memoize(suma);

// Prueba :P
console.log(memoizedSuma(2, 4)); 
console.log(memoizedSuma(2, 4)); 
console.log(memoizedSuma(5, 5)); 
console.log("callCount:", callCount); // 1