// gestorNotas.js

const fs = require('fs');

// Ruta del archivo de notas (en la misma carpeta)
const filePath = './notas.json';

/**
 * Agrega una nueva nota al archivo JSON.
 * @param {string} titulo - El título de la nota.
 * @param {string} contenido - El contenido de la nota.
 */
function agregarNota(titulo, contenido) {
  let notas = [];
  
  // Validamos si el archivo ya existe para traer la data actual
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      if (data) {
        notas = JSON.parse(data);
      }
    } catch (error) {
      console.error('Error al leer el archivo existente:', error);
    }
  }

  // Se añade la nueva nota al array de notas
  const nuevaNota = { titulo, contenido };
  notas.push(nuevaNota);

  try {
    // Escribimos al archivo con stringify (null, 2) nos ayuda a formatearlo legiblemente.
    fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));
    console.log(`✅ Nota "${titulo}" agregada con éxito.`);
  } catch (error) {
    console.error('Error al guardar la nota:', error);
  }
}

/**
 * Lista todas las notas guardadas imprimiendo en consola.
 */
function listarNotas() {
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      const notas = JSON.parse(data);
      
      console.log('\n--- 📝 TUS NOTAS GUARDADAS ---');
      if (notas.length === 0) {
        console.log('No tienes notas actuales.');
      } else {
        notas.forEach((nota, indice) => {
          console.log(`[${indice + 1}] ${nota.titulo}: ${nota.contenido}`);
        });
      }
      console.log('------------------------------\n');
    } catch (error) {
      console.error('Error al procesar el archivo listando las notas:', error);
    }
  } else {
    console.log('⚠️ No hay notas guardadas aún.');
  }
}

/**
 * Elimina una nota específica comparando su título.
 * @param {string} titulo - El título de la nota a eliminar.
 */
function eliminarNota(titulo) {
  if (fs.existsSync(filePath)) {
    try {
      const data = fs.readFileSync(filePath, 'utf8');
      let notas = JSON.parse(data);

      const tamañoInicial = notas.length;
      // Filtramos descartando a la nota que coincida con el título
      notas = notas.filter((nota) => nota.titulo !== titulo);

      if (notas.length < tamañoInicial) {
        // Se encontró y se borró una nota
        fs.writeFileSync(filePath, JSON.stringify(notas, null, 2));
        console.log(`🗑️ Nota con título "${titulo}" eliminada.`);
      } else {
        console.log(`❌ No se encontró ninguna nota con el título "${titulo}".`);
      }
    } catch (error) {
       console.error('Error al intentar eliminar la nota:', error);
    }
  } else {
    console.log('⚠️ No hay notas para eliminar (El archivo no existe).');
  }
}

// ==========================================
// EJECUCIÓN DE PRUEBA
// ==========================================

console.log("Iniciando Gestor de Notas...\n");

// 1. Agregar un par de notas de ejemplo
agregarNota('Compras', 'Comprar leche y pan.');
agregarNota('Trabajo', 'Terminar reporte semanal.');

// 2. Listarlas en pantalla
listarNotas();

// 3. Eliminar una de ellas
eliminarNota('Compras');

// 4. Volver a listar para ver la actualización final
listarNotas();
