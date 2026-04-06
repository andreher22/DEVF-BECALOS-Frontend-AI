// ventana.js

// Función que encuentra la palabra más larga simulando una ventana deslizante simple
export const findLongestWord = (texto) => {
    // Limpiamos los signos de puntuación usando una expresión regular para que no se sumen a la longitud de la palabra
    // Luego dividimos el texto en palabras separadas por espacios
    const textoLimpio = texto.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    const palabras = textoLimpio.split(' ');

    // Inicializar la variable para la palabra más larga
    let longestWord = '';

    // Recorrer el arreglo de palabras con un ciclo (for...of)
    for (const palabraActual of palabras) {
        // Comparar la longitud de la palabra actual con el récord de la más larga
        if (palabraActual.length > longestWord.length) {
            // Actualizar la palabra más larga si encontramos otra mayor
            longestWord = palabraActual;
        }
    }

    // Retornar la palabra más larga encontrada
    return longestWord;
};
