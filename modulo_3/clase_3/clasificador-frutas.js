// ===================================================
// PRÁCTICA: Arreglos y Ciclos (Conteo de elementos)
// ===================================================

// 1. Declaramos el arreglo de frutas (algunas repetidas para contar)
const frutas = ["manzana", "pera", "manzana", "platano", "pera", "manzana", "uva"];

// 2. Creamos un objeto vacío para almacenar el conteo
// Los objetos guardan datos en pares clave:valor (ej. manzana: 3)
const conteoFrutas = {};

// --- OPCIÓN 1: Usando ciclo FOR ---
console.log("--- Conteo con ciclo FOR ---");

for (let i = 0; i < frutas.length; i++) {
    let fruta = frutas[i];
    
    // Si la fruta ya existe en el objeto, sumamos 1
    // Si no existe, la inicializamos en 1
    if (conteoFrutas[fruta]) {
        conteoFrutas[fruta]++;
    } else {
        conteoFrutas[fruta] = 1;
    }
}

// Imprimimos el resultado del objeto
console.log(conteoFrutas);


// --- OPCIÓN 2: Usando ciclo WHILE (Opcional) ---
console.log("--- Conteo con ciclo WHILE ---");

const conteoWhile = {};
let j = 0;

while (j < frutas.length) {
    let frutaActual = frutas[j];
    
    // Lógica simplificada: 
    // Si existe suma 1, si no (||) empieza en 0 y suma 1
    conteoWhile[frutaActual] = (conteoWhile[frutaActual] || 0) + 1;
    
    j++; // ¡Importante! El incremento para evitar el bucle infinito
}

console.log(conteoWhile);

// 3. Imprimir el desglose final de manera legible
for (const fruta in conteoFrutas) {
    console.log(`Hay ${conteoFrutas[fruta]} unidad(es) de: ${fruta}`);
}