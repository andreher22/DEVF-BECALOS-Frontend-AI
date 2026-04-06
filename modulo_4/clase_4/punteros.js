// punteros.js

// Lista de invitados inicial
export const invitados = ["Ana", "Carlos", "Cecilia", "Daniel", "Diana", "Eduardo"];

// Función que aplica el algoritmo de 2 punteros
export const encontrarPareja = (arr) => {
    // Definimos los punteros iniciales
    let inicio = 0;
    let siguiente = 1;

    // Recorremos el arreglo siempre que "siguiente" esté dentro de los límites
    while (siguiente < arr.length) {
        // Obtenemos la primera letra de cada nombre. 
        // Usamos .charAt(0) y .toLowerCase() para asegurar la comparación sin importar mayúsculas
        const inicialInicio = arr[inicio].charAt(0).toLowerCase();
        const inicialSiguiente = arr[siguiente].charAt(0).toLowerCase();

        // Comparamos las iniciales
        if (inicialInicio === inicialSiguiente) {
            // Si coinciden, hemos encontrado la primera pareja, retornamos el arreglo con los 2 nombres
            return [arr[inicio], arr[siguiente]];
        }

        // Si no coinciden, avanzamos ambos punteros
        inicio++;
        siguiente++;
    }

    // Retorna null si completó todo el recorrido sin encontrar pares
    return null;
};
