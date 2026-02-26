// ===================================================
// ARCHIVO: tipos-de-dato.js
// PRÁCTICA DE TIPOS DE DATOS EN JAVASCRIPT
// ===================================================

/* El operador 'typeof' nos permite conocer la naturaleza 
   del valor almacenado en una variable o constante.
*/

// --- NUMBERS (Números) ---
// JavaScript no distingue entre enteros y decimales en el tipo; todos son 'number'
console.log(typeof 42);           // Resultado: "number"
console.log(typeof -666);         // Resultado: "number" (números negativos)
console.log(typeof 0);            // Resultado: "number"
console.log(typeof 3.1416);       // Ejemplo propio: Decimales también son "number"

// --- STRINGS (Cadenas de texto) ---
// Pueden ir en comillas simples, dobles o backticks (`)
console.log(typeof 'Veinticinco'); // Resultado: "string"
console.log(typeof "");           // Resultado: "string" (un string vacío sigue siendo string)
console.log(typeof "JS Rocks");    // Ejemplo propio: Texto con espacios

// --- BOOLEANS (Lógica Booleana) ---
// Solo pueden ser true o false (en minúsculas)
console.log(typeof true);          // Resultado: "boolean"
console.log(typeof false);         // Resultado: "boolean"

// --- CASO ESPECIAL: FALSE (Mayúsculas) ---
/* Ojo aquí: JavaScript es "case-sensitive". 
   Si escribimos FALSE en mayúsculas, JS lo busca como una variable.
   Para que el código no falle, lo evaluamos como string o comentamos que daría error.
*/
// console.log(typeof FALSE);      // Esto daría un error: ReferenceError: FALSE is not defined
console.log(typeof "FALSE");       // Si está entre comillas, es "string"

// --- NULL ---
/* DATO CURIOSO: 'typeof null' devuelve "object". 
   Es un error histórico de JavaScript que nunca se corrigió para no romper la web.
*/
console.log(typeof null);          // Resultado: "object"

// --- UNDEFINED ---
// Representa una variable que ha sido declarada pero no tiene valor asignado
console.log(typeof undefined);     // Resultado: "undefined"

// --- EXTRAS (Ejemplos propios) ---
console.log(typeof NaN);           // Resultado: "number" (Not a Number es técnicamente un tipo número)
console.log(typeof [1, 2, 3]);     // Resultado: "object" (Los arrays son objetos en JS)