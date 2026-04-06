// app.js

import { gifts, findGift } from './recursion.js';

const iniciarApp = () => {
    console.log("============= SISTEMA RECURSIVO DE REGALOS =============\n");
    console.log("Inventario actual:");
    console.log(gifts, "\n");

    // Prueba 1: Buscando un regalo que existe
    console.log("🔎 PRUEBA 1:");
    let giftToFind = "Lego";
    console.log(`Iniciando búsqueda para: "${giftToFind}"`);
    console.log("Resultado: " + findGift(gifts, giftToFind)); // Salida esperada: Lego está en la posición 3.

    console.log("\n--------------------------------------------------------\n");

    // Prueba 2: Buscando un regalo que NO existe
    console.log("🔎 PRUEBA 2:");
    giftToFind = "Camión";
    console.log(`Iniciando búsqueda para: "${giftToFind}"`);
    console.log("Resultado: " + findGift(gifts, giftToFind)); // Salida esperada: Camión no está en la lista.

    console.log("\n=========================================================");
};

iniciarApp();
