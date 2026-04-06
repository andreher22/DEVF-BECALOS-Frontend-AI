// app.js

import { invitados, encontrarPareja } from './punteros.js';

const iniciarApp = () => {
    console.log("============= CENA DE INVITADOS =============");
    console.log("Lista completa de invitados ordenados:");
    console.log(invitados);
    console.log("\nBuscando el primer par de invitados que puedan sentarse juntos...");

    // Ejecutamos la función de búsqueda
    const parejaEncontrada = encontrarPareja(invitados);

    if (parejaEncontrada !== null) {
        console.log(`\n✅ ¡Pareja encontrada exitosamente! \n➡️  Se pueden sentar juntos: "${parejaEncontrada[0]}" y "${parejaEncontrada[1]}"`);
    } else {
        console.log("\n❌ No se encontró ninguna pareja cuyas iniciales coincidan.");
    }
    
    console.log("=============================================");
};

iniciarApp();
