/**
 * PROYECTO: GESTIÓN DE UNA BIBLIOTECA DE LIBROS (CALLBACKS & JSON)
 * Entregable de código para simulación de persistencia asíncrona.
 */

// 1. Base de datos inicial almacenada como una cadena de texto en formato JSON
let bibliotecaJSON = `[
  {
    "titulo": "Cien años de soledad",
    "autor": "Gabriel García Márquez",
    "genero": "Realismo mágico",
    "disponible": true
  },
  {
    "titulo": "Don Quijote de la Mancha",
    "autor": "Miguel de Cervantes",
    "genero": "Novela de aventuras",
    "disponible": false
  },
  {
    "titulo": "El resplandor",
    "autor": "Stephen King",
    "genero": "Terror",
    "disponible": true
  }
]`;

// ==========================================
// OPERACIONES DE ALMACENAMIENTO (SIMULADAS)
// ==========================================

/**
 * 2. Simula la LECTURA de un archivo JSON usando un callback y un retraso de tiempo
 */
function leerBaseDatos(callback) {
  console.log("\n⏳ [Sistema] Leyendo inventario desde el archivo JSON...");
  
  setTimeout(() => {
    try {
      // Convertimos la cadena JSON en un arreglo de objetos JavaScript
      const libros = JSON.parse(bibliotecaJSON);
      callback(null, libros);
    } catch (error) {
      callback("Error al parsear el archivo de datos.", null);
    }
  }, 1200); // Retraso de 1.2 segundos para simular asincronía
}

/**
 * 4. Simula la ESCRITURA en un archivo JSON usando un callback
 */
function escribirBaseDatos(nuevosDatos, callback) {
  console.log("⏳ [Sistema] Guardando cambios en el archivo JSON...");
  
  setTimeout(() => {
    try {
      // Convertimos el objeto/arreglo de JS de vuelta a formato de texto JSON string
      bibliotecaJSON = JSON.stringify(nuevosDatos, null, 2);
      callback(null, "¡Datos guardados con éxito en el archivo!");
    } catch (error) {
      callback("Error al escribir los datos.", null);
    }
  }, 1200);
}

// ==========================================
// FUNCIONES DE INTERACCIÓN CON EL INVENTARIO
// ==========================================

/**
 * Tarea 1: Consultar libros en el inventario
 */
function consultarInventario() {
  leerBaseDatos((error, libros) => {
    if (error) {
      console.error("❌ Error:", error);
      return;
    }
    
    console.log("\n=================== INVENTARIO DE LIBROS ===================");
    libros.forEach((libro, index) => {
      const estado = libro.disponible ? "🟢 Disponible" : "🔴 Prestado";
      console.log(`${index + 1}. "${libro.titulo}" - ${libro.autor} | Género: ${libro.genero} | Estado: ${estado}`);
    });
    console.log("============================================================\n");
  });
}

/**
 * Tarea 2: Agregar un nuevo libro a la colección
 */
function agregarLibro(nuevoLibro, callback) {
  // Primero leemos los datos actuales
  leerBaseDatos((error, libros) => {
    if (error) return callback(error);
    
    // Agregamos el nuevo libro al arreglo de objetos
    libros.push(nuevoLibro);
    console.log(`✨ [Inventario] Agregando: "${nuevoLibro.titulo}"`);
    
    // Guardamos el arreglo actualizado en nuestro JSON simulado
    escribirBaseDatos(libros, (err, mensajeExito) => {
      if (err) return callback(err);
      callback(null, mensajeExito);
    });
  });
}

/**
 * Tarea 3: Actualizar la disponibilidad de un libro
 */
function actualizarDisponibilidad(tituloLibro, nuevoEstado, callback) {
  leerBaseDatos((error, libros) => {
    if (error) return callback(error);
    
    // Buscamos el libro por su título
    const libro = libros.find(l => l.titulo.toLowerCase() === tituloLibro.toLowerCase());
    
    if (!libro) {
      return callback(`El libro "${tituloLibro}" no se encuentra en la biblioteca.`);
    }
    
    // Cambiamos el estado de disponibilidad
    libro.disponible = nuevoEstado;
    console.log(`🔄 [Inventario] Cambiando estado de "${libro.titulo}" a -> ${nuevoEstado ? "Disponible" : "Prestado"}`);
    
    // Guardamos los datos modificados
    escribirBaseDatos(libros, (err, mensajeExito) => {
      if (err) return callback(err);
      callback(null, mensajeExito);
    });
  });
}


// ==========================================
// FLUJO DE PRUEBA (EJECUCIÓN SECUENCIAL)
// ==========================================

console.log("🚀 Iniciando el sistema de gestión de la biblioteca...");

// Paso 1: Consultar el inventario inicial
consultarInventario();

// Paso 2: Agregar un nuevo libro después de que termine la primera consulta (Simulación de tiempos concurrentes)
setTimeout(() => {
  const libroNuevo = {
    titulo: "El Psicoanalista",
    autor: "John Katzenbach",
    genero: "Thriller psicológico",
    disponible: true
  };

  agregarLibro(libroNuevo, (error, mensaje) => {
    if (error) {
      console.error("❌ Error al agregar:", error);
    } else {
      console.log(`✅ ${mensaje}`);
      
      // Paso 3: Dentro del callback de éxito, actualizamos la disponibilidad de otro libro
      // Esto asegura que la base de datos no sufra colisiones de escritura (Flujo controlado)
      actualizarDisponibilidad("Cien años de soledad", false, (errorAct, mensajeAct) => {
        if (errorAct) {
          console.error("❌ Error al actualizar:", errorAct);
        } else {
          console.log(`✅ ${mensajeAct}`);
          
          // Paso 4: Consultar el inventario final para verificar que todo se guardó correctamente
          consultarInventario();
        }
      });
    }
  });
}, 2000); // Esperamos 2 segundos para dar espacio visual en la consola