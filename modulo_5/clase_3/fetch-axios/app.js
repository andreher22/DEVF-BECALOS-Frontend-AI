/**
 * PROYECTO: CONSUMO DE APIS CON FETCH Y AXIOS
 * Lógica asíncrona para la renderización de personajes de Rick & Morty.
 */

// Endpoint que expone los primeros 20 personajes de la serie
const API_URL = 'https://rickandmortyapi.com/api/character';

// Elementos del DOM
const btnFetch = document.getElementById('btn-fetch');
const btnAxios = document.getElementById('btn-axios');
const dataContainer = document.getElementById('data-container');

/**
 * Muestra un mensaje visual de carga en el contenedor
 */
function mostrarCargando(metodo) {
  dataContainer.innerHTML = `<div class="loader">🧬 Transmitiendo datos desde el multiverso con ${metodo}...</div>`;
}

/**
 * Gestiona el maquetado de errores en la interfaz
 */
function mostrarError(metodo, error) {
  dataContainer.innerHTML = `
    <div class="error-msg">
      💥 ¡Wubba Lubba Dub Dub! Falló la solicitud mediante <strong>${metodo}</strong>.<br>
      <small style="color: #9e9e9e; font-family: monospace;">Motivo: ${error.message}</small>
    </div>`;
}

/**
 * Tarea 7 y 8: Renderizar las tarjetas de personajes en la UI
 */
function mostrarPersonajes(personajes) {
  // Limpiamos el contenedor previo (mensajes de inicio o cargas)
  dataContainer.innerHTML = '';

  // Recorremos el arreglo de resultados inyectando la estructura de la tarjeta
  personajes.forEach(personaje => {
    const tarjeta = document.createElement('div');
    tarjeta.className = 'character-card';

    // Determinar estilo dinámico del estatus de vida
    let claseEstado = 'status-unknown';
    if (personaje.status.toLowerCase() === 'alive') claseEstado = 'status-alive';
    if (personaje.status.toLowerCase() === 'dead') claseEstado = 'status-dead';

    tarjeta.innerHTML = `
      <img src="${personaje.image}" alt="${personaje.name}" loading="lazy">
      <h3>${personaje.name}</h3>
      <p>Especie: ${personaje.species}</p>
      <div class="status-container">
        <span class="status-badge ${claseEstado}">${personaje.status}</span>
      </div>
    `;
    dataContainer.appendChild(tarjeta);
  });
}

/**
 * Tarea 5: Petición HTTP utilizando FETCH API
 */
async function consumirConFetch() {
  mostrarCargando('Fetch');
  console.log('🌐 [HTTP] Iniciando petición con Fetch nativo...');

  try {
    const respuesta = await fetch(API_URL);

    // NOTA EVALUATIVA: Fetch NO arroja error automáticamente si el estatus es 404 o 500. 
    // Es obligatorio validar manualmente la propiedad '.ok'
    if (!respuesta.ok) {
      throw new Error(`Error en el servidor. Código de Estado: ${respuesta.status}`);
    }

    // Convertimos la respuesta cruda en JSON exploitable por JS
    const datos = await respuesta.json();
    
    console.log('✅ [Fetch] Éxito:', datos.results);
    mostrarPersonajes(datos.results);

  } catch (error) {
    console.error('❌ [Fetch] Error detectado:', error);
    mostrarError('Fetch', error);
  }
}

/**
 * Tarea 6: Petición HTTP utilizando AXIOS
 */
async function consumirConAxios() {
  mostrarCargando('Axios');
  console.log('🚀 [HTTP] Iniciando petición con Axios...');

  try {
    // NOTA EVALUATIVA: Axios transforma automáticamente la respuesta a JSON 
    // y sí ejecuta el bloque 'catch' de inmediato si el estatus de red es != 2xx
    const respuesta = await axios.get(API_URL);

    // Los datos formateados que devuelve el servidor con Axios se guardan en '.data'
    console.log('✅ [Axios] Éxito:', respuesta.data.results);
    mostrarPersonajes(respuesta.data.results);

  } catch (error) {
    console.error('❌ [Axios] Error detectado:', error);
    mostrarError('Axios', error);
  }
}

// Event Listeners encargados de detonar los procesos asíncronos
btnFetch.addEventListener('click', consumirConFetch);
btnAxios.addEventListener('click', consumirConAxios);