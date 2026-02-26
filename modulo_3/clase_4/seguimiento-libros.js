// ===================================================
// PRÁCTICA: Funciones y Scope en JavaScript
// ===================================================

// 1. Declaramos un array en el scope global para almacenar los títulos
const librosLeidos = [];

/**
 * Función para agregar un libro al listado.
 * @param {string} titulo - El nombre del libro leído.
 */
const agregarLibro = (titulo) => {
    // Usamos el método push para añadir el elemento al final del array global
    librosLeidos.push(titulo);
    console.log(`Libro añadido: "${titulo}"`);
};

/**
 * Función para mostrar todos los libros almacenados.
 * Si el array está vacío, muestra un mensaje de aviso.
 */
function mostrarLibrosLeidos() {
    console.log("--- Mis Libros Leídos ---");
    
    // Verificamos si hay libros en la lista
    if (librosLeidos.length === 0) {
        console.log("Aún no has registrado ningún libro.");
    } else {
        // Usamos un ciclo para recorrer el array e imprimirlos
        for (let i = 0; i < librosLeidos.length; i++) {
            console.log(`${i + 1}. ${librosLeidos[i]}`);
        }
    }
}

// --- Pruebas del sistema ---

// Agregamos algunos libros
agregarLibro("El Principito");
agregarLibro("Cien años de soledad");
agregarLibro("Crónica de una muerte anunciada");

// Mostramos la lista final
mostrarLibrosLeidos();