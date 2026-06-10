/**
 * PROYECTO: SISTEMA DE RESERVAS PARA UN RESTAURANTE (PROMESAS Y ASYNC/AWAIT)
 * Entregable de código listo para su ejecución y control de flujos asíncronos.
 */

// Estado inicial del restaurante (Inventario de mesas virtuales)
let mesasDisponibles = 5;

/**
 * Instrucción 1: Verificar Disponibilidad de Mesas
 * Devuelve una Promesa que evalúa si el restaurante cuenta con espacio suficiente.
 */
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    console.log(`🔍 [Sistema] Verificando disponibilidad para ${mesasSolicitadas} mesa(s)...`);
    
    // Simulamos un breve retraso de red (1 segundo)
    setTimeout(() => {
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve("¡Mesas disponibles encontradas!");
      } else {
        reject(`Lo sentimos, no hay suficientes mesas. Disponibles: ${mesasDisponibles}, Solicitadas: ${mesasSolicitadas}.`);
      }
    }, 1000);
  });
}

/**
 * Instrucción 2: Simular Envío de Confirmación por Correo
 * Devuelve una Promesa que simula una petición de red SMTP con posibilidad de fallo aleatorio.
 */
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    console.log(`✉️ [Email] Intentando enviar correo de confirmación a ${nombreCliente}...`);
    
    setTimeout(() => {
      // Generamos una probabilidad de éxito del 80% (Math.random() > 0.2)
      const correoEnviadoExitosamente = Math.random() > 0.2;

      if (correoEnviadoExitosamente) {
        resolve(`Correo enviado con éxito a ${nombreCliente}. ¡Te esperamos!`);
      } else {
        reject("Fallo en el servidor de correo (Timeout SMTP).");
      }
    }, 1500);
  });
}

/**
 * Instrucción 3: Control de Flujo en la Función Principal
 * Coordina las tareas asíncronas de manera lineal utilizando bloques try/catch.
 */
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  console.log(`\n================ NEW REQUEST: ${nombreCliente.toUpperCase()} ================`);
  
  try {
    // 3.1. Esperamos la verificación de disponibilidad
    const confirmacionMesas = await verificarDisponibilidad(mesasSolicitadas);
    console.log(`🟢 ${confirmacionMesas}`);

    // Si la promesa se resuelve, apartamos temporalmente las mesas en el inventario
    mesasDisponibles -= mesasSolicitadas;

    // 3.2. Intentamos enviar el correo electrónico de confirmación
    const confirmacionCorreo = await enviarConfirmacionReserva(nombreCliente);
    console.log(`🟢 ${confirmacionCorreo}`);
    
    console.log(`🎉 [Éxito] ¡Reserva confirmada para ${nombreCliente}! Mesas restantes en el restaurante: ${mesasDisponibles}`);

  } catch (error) {
    // 3.3. Manejo adecuado de errores globales
    console.error(`❌ [ERROR EN RESERVA]: ${error}`);
    console.log(`⚠️ La solicitud de ${nombreCliente} no pudo completarse.`);
  }
  
  console.log("==========================================================");
}


// ==========================================================
// Instrucción 4: Probar la solución (Casos de prueba)
// ==========================================================
async function ejecutarPruebas() {
  console.log("🚀 Iniciando pruebas del sistema de reservas...");

  // Caso 1: Reserva exitosa (Solicita menos mesas de las disponibles)
  await hacerReserva("Mariano Robles", 2);

  // Caso 2: Reserva fallida por falta de inventario (Pide más de las 3 mesas que quedan)
  await hacerReserva("Sofía Hernández", 4);

  // Caso 3: Reserva que pone a prueba el envío del correo (Pide espacio válido)
  // Nota: Al usar Math.random(), este caso puede arrojar éxito o fallo de red de forma aleatoria.
  await hacerReserva("Carlos Robles", 2);
}

// Ejecución del set de pruebas
ejecutarPruebas();