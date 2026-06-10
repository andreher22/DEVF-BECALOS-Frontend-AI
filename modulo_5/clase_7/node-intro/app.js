/**
 * ARCHIVO PRINCIPAL: Consola de Exploración Espacial
 * Punto de entrada encargado de renderizar y procesar la bitácora.
 */

// 1. Importar el sistema de módulos local
import { planetasFavoritos } from './planetas.js';

console.log("======================================================");
console.log("👩‍🚀 BITÁCORA OFICIAL DE EXPLORACIÓN ESPACIAL 🚀");
console.log("======================================================\n");

/**
 * Tarea principal: Mostrar la lista de planetas en formato amigable
 */
function listarPlanetas() {
  console.log("🪐 [Catálogo Completo] Planetas Registrados:");
  
  planetasFavoritos.forEach(planeta => {
    console.log(`🔹 N° ${planeta.id} | Nombre: ${planeta.nombre}`);
    console.log(`   └─ Tipo: ${planeta.tipo} | Distancia: ${planeta.distancia}`);
    console.log(`   └─ Sostenibilidad de Vida: ${planeta.habitable ? "🟢 Altamente Probable" : "🔴 Hostil / Inhabitable"}\n`);
  });
}

/**
 * FUNCIONALIDAD ADICIONAL 1: Filtro de condiciones de Habitabilidad
 */
function mostrarPlanetasHabitables() {
  console.log("------------------------------------------------------");
  console.log("🔍 [Filtro de Escáner] Analizando zonas habitables...");
  console.log("------------------------------------------------------");
  
  const habitables = planetasFavoritos.filter(planeta => planeta.habitable);
  
  if (habitables.length > 0) {
    console.log(`💡 Se encontraron ${habitables.length} destinos viables para la colonización:`);
    habitables.forEach(p => console.log(`   👉 ${p.nombre} (${p.tipo}) - A una distancia de ${p.distancia}`));
  } else {
    console.log("❌ No se detectaron planetas con biósferas estables en la base de datos actual.");
  }
  console.log("\n");
}

/**
 * FUNCIONALIDAD ADICIONAL 2: Selector e Iniciador Aleatorio de Misiones
 */
function iniciarMisionAleatoria() {
  console.log("------------------------------------------------------");
  console.log("🎲 [Generador de Misiones] Eligiendo rumbo al azar...");
  console.log("------------------------------------------------------");
  
  // Fórmula matemática para elegir un índice aleatorio del arreglo
  const indiceAleatorio = Math.floor(Math.random() * planetasFavoritos.length);
  const planetaDestino = planetasFavoritos[indiceAleatorio];

  console.log(`🚀 ¡Misión Iniciada!`);
  console.log(`🎯 Destino fijado: Navegando hacia "${planetaDestino.nombre}"`);
  console.log(`🛸 Estado del viaje: Calculando hiperespacio para recorrer ${planetaDestino.distancia}.`);
  console.log("======================================================\n");
}

// Ejecución secuencial de los procesos del taller en la terminal
listarPlanetas();
mostrarPlanetasHabitables();
iniciarMisionAleatoria();


// npm run sistema:check
//npm start