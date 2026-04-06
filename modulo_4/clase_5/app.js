// app.js

import { findLongestWord } from './ventana.js';

const iniciarApp = () => {
    const text = "JavaScript es un lenguaje de programación increíble para aprender.";
    
    console.log("============= BÚSQUEDA DE PALABRA =============\n");
    console.log("Texto original:");
    console.log(`"${text}"\n`);
    
    console.log("Iterando y buscando la palabra más larga...\n");

    // Llama a la función y muestra el resultado
    const palabraMasLarga = findLongestWord(text);

    // Resultado esperado: "programación" 
    // (Nota: Si contamos el punto "aprender." sería más largo si no hubiésemos limpiado los signos en la otra función)
    console.log(`✅ La palabra más larga es: "${palabraMasLarga}"`);
    console.log(`📏 Longitud: ${palabraMasLarga.length} caracteres.`);
    console.log("\n===============================================");
};

iniciarApp();
