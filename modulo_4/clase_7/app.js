// app.js

import { findMax } from './divide.js';

const iniciarApp = () => {
    const numeros = [3, 8, 2, 10, 5, 7];
    
    console.log("============= ALGORITMO: DIVIDE Y VENCERÁS =============");
    console.log("Arreglo de números de entrada:");
    console.log(numeros);

    console.log("\nProcesando el número mayor dividiendo en sub-arreglos...");
    const maximo = findMax(numeros);

    // Salida esperada acorde al requerimiento: 10
    console.log(`\n✅ El número máximo encontrado en el arreglo es: ${maximo}`);
    console.log("=========================================================");
};

// Se ejecuta el programa principal
iniciarApp();
