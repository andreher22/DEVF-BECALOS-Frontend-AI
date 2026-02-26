// ===================================================
// PRÁCTICA: Objetos, Métodos y Manipulación de Propiedades
// ===================================================

// 1. Definición del objeto Libro
const libro = {
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anio: 1967,
    estado: "disponible",
    capitulos: ["I. Introducción", "II. El éxodo", "III. La fundación"],

    // Método para imprimir la información básica
    describirLibro: function() {
        console.log(`Libro titulado "${this.titulo}", escrito por ${this.autor} en el año ${this.anio}. Estado actual: ${this.estado}.`);
    },

    // --- Funcionalidades Opcionales ---

    // Método para agregar un capítulo
    agregarCapitulo: function(nuevoCapitulo) {
        this.capitulos.push(nuevoCapitulo);
        console.log(`Capítulo "${nuevoCapitulo}" agregado con éxito.`);
    },

    // Método para eliminar el último capítulo
    eliminarCapitulo: function() {
        if (this.capitulos.length > 0) {
            const eliminado = this.capitulos.pop();
            console.log(`Capítulo "${eliminado}" eliminado.`);
        } else {
            console.log("No hay capítulos para eliminar.");
        }
    },

    // Método para listar capítulos
    listarCapitulos: function() {
        console.log(`Capítulos de "${this.titulo}": ${this.capitulos.join(", ")}`);
    }
};

// --- Ejecución de Pruebas ---

// Describir el libro inicialmente
libro.describirLibro();

// Gestionar capítulos
libro.agregarCapitulo("IV. La peste del insomnio");
libro.listarCapitulos();

// Cambiar el estado del libro
libro.estado = "prestado";
console.log("Cambiando estado...");

// Mostrar información actualizada
libro.describirLibro();