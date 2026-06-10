// Arreglo de opciones para generar pedidos aleatorios
const menu = ["Espresso ☕", "Capuccino 🥛", "Latte Vainilla 🧊", "Americano 🖤", "Muffin de Chispas 🧁", "Croissant 🥐"];

let contadorPedidos = 1;

// Seleccionar elementos del DOM
const btnAgregar = document.getElementById('btn-agregar');
const contenedorPedidos = document.getElementById('contenedor-pedidos');

// 1. Mecanismo Asincrónico: Promesa + setTimeout para simular el tiempo de preparación
function simularPreparacion(tiempo) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, tiempo);
  });
}

// 2. Función Principal Async/Await para procesar el ciclo de vida del pedido
async function procesarPedido(idPedido, nombreCafe, elementoPedido, elementoEstado) {
  // Generar un tiempo aleatorio entre 2 y 5 segundos (2000ms a 5000ms)
  const tiempoPreparacion = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;

  console.log(`[Pedido #${idPedido}] Iniciando preparación de ${nombreCafe}. Tomará ${(tiempoPreparacion/1000).toFixed(1)}s.`);

  // Esperar a que la promesa se resuelva sin bloquear el hilo principal (Event Loop en acción)
  await simularPreparacion(tiempoPreparacion);

  // 3. Actualización visual del estado del pedido al completarse
  elementoPedido.classList.add('completado');
  elementoEstado.textContent = '✅ Completado';
  elementoEstado.className = 'estado completado';
  
  console.log(`[Pedido #${idPedido}] ¡${nombreCafe} listo para entregar!`);
}

// 4. Función para recibir y maquetar un nuevo pedido
function recibirPedido() {
  const idActual = contadorPedidos++;
  const itemAleatorio = menu[Math.floor(Math.random() * menu.length)];
  
  // Crear la estructura HTML del pedido de manera dinámica
  const tarjetaPedido = document.createElement('div');
  tarjetaPedido.className = 'tarjeta-pedido';
  tarjetaPedido.id = `pedido-${idActual}`;

  const infoTexto = document.createElement('span');
  infoTexto.innerHTML = `<strong>Pedido #${idActual}</strong>: ${itemAleatorio}`;

  const badgeEstado = document.createElement('span');
  badgeEstado.className = 'estado proceso';
  badgeEstado.textContent = '⏳ En Proceso';

  tarjetaPedido.appendChild(infoTexto);
  tarjetaPedido.appendChild(badgeEstado);
  contenedorPedidos.appendChild(tarjetaPedido);

  // Desparar el proceso asíncrono de preparación
  procesarPedido(idActual, itemAleatorio, tarjetaPedido, badgeEstado);
}

// Escuchador de eventos del botón
btnAgregar.addEventListener('click', recibirPedido);