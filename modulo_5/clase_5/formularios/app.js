/**
 * PROYECTO: MANEJO Y VALIDACIÓN DE FORMULARIOS CON JAVASCRIPT
 * Código del lado del cliente encargado del control, captura y filtrado de datos.
 */

// Seleccionar elementos del ecosistema del DOM
const form = document.getElementById('eventForm');
const alertContainer = document.getElementById('alert-container');

/**
 * Función encargada de renderizar mensajes en el contenedor de alertas
 */
function mostrarAlerta(mensaje, tipo) {
  alertContainer.textContent = ''; // Limpiar estados previos
  alertContainer.className = `alert alert-${tipo}`;
  
  if (Array.isArray(mensaje)) {
    // Si recibimos una lista de errores de validación, creamos una estructura de lista
    const ul = document.createElement('ul');
    ul.style.margin = '0';
    ul.style.paddingLeft = '20px';
    mensaje.forEach(err => {
      const li = document.createElement('li');
      li.textContent = err;
      ul.appendChild(li);
    });
    alertContainer.appendChild(ul);
  } else {
    alertContainer.textContent = mensaje;
  }
  
  alertContainer.classList.remove('hidden');
}

/**
 * Escuchador del evento de envío del formulario
 */
form.addEventListener('submit', function(event) {
  // 1. Previene el envío automático por defecto para controlar el flujo con JS [cite: 1389, 1390]
  event.preventDefault(); 
  
  // Ocultar alerta previa si existe
  alertContainer.classList.add('hidden');

  // 2. Capturar valores directos de la interfaz utilizando sus referencias [cite: 1389, 1391]
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const eventDateValue = document.getElementById('eventDate').value; [cite: 1420]
  const idFileElement = document.getElementById('idFile');
  
  // 3. Capturar valores grupales dinámicos (Checkboxes y Radios) [cite: 1411, 1415]
  const checkedInterests = Array.from(document.querySelectorAll('input[name="interests"]:checked')) [cite: 1410, 1411]
    .map(checkbox => checkbox.value);
    
  const selectedSchedule = document.querySelector('input[name="schedule"]:checked')?.value; [cite: 1414, 1415]
  
  // Capturar archivo si fue cargado por el asistente [cite: 1423]
  const uploadedFile = idFileElement.files[0]; [cite: 1423]

  // Arreglo recolector para registrar inconsistencias de validación
  const errores = [];

  // ==========================================
  // BLOQUE DE VALIDACIONES DEL FORMULARIO
  // ==========================================

  // Validaciones básicas de campos vacíos
  if (!name) errores.push("El campo 'Nombre Completo' es obligatorio.");
  if (!email) errores.push("El campo 'Correo Electrónico' es obligatorio.");
  if (!email.includes('@')) errores.push("Introduce un formato de correo electrónico válido."); [cite: 1393, 1394]

  // VALIDACIÓN ADICIONAL 1: Control de formato telefónico estricto (10 dígitos exactos)
  const phoneRegex = /^\d{10}$/;
  if (!phone) {
    errores.push("El campo 'Teléfono de Contacto' es requerido.");
  } else if (!phoneRegex.test(phone)) {
    errores.push("El teléfono debe contener exactamente 10 dígitos numéricos (sin espacios ni guiones).");
  }

  // VALIDACIÓN ADICIONAL 2: Asegurar que se seleccione al menos un interés (Checkbox)
  if (checkedInterests.length === 0) {
    errores.push("Debes seleccionar al menos un área de interés para el evento.");
  }

  // VALIDACIÓN ADICIONAL 3: Validar que la fecha seleccionada sea en el futuro
  if (!eventDateValue) {
    errores.push("Es obligatorio que selecciones una fecha para asistir al evento.");
  } else {
    const fechaSeleccionada = new Date(eventDateValue + "T00:00:00");
    const fechaActual = new Date();
    fechaActual.setHours(0, 0, 0, 0); // Resetear horas para comparar únicamente días
    
    if (fechaSeleccionada <= fechaActual) {
      errores.push("La fecha elegida debe ser posterior al día de hoy. No se permiten fechas pasadas.");
    }
  }

  // ==========================================
  // EVALUACIÓN DE RESULTADOS DE VALIDACIÓN
  // ==========================================

  if (errores.length > 0) {
    // Si el arreglo contiene elementos, detenemos el flujo y mostramos las fallas
    mostrarAlerta(errores, 'error');
  } else {
    // Si no hay errores, simulamos el procesamiento exitoso de los datos capturados
    console.log("📊 [Datos Enviados del Registro]:", {
      asistente: name,
      correo: email,
      telefono: phone,
      intereses: checkedInterests,
      horario: selectedSchedule,
      fechaEvento: eventDateValue,
      archivoAdjunto: uploadedFile ? uploadedFile.name : "Ninguno"
    });

    // Mostrar retroalimentación positiva al usuario en la pantalla
    mostrarAlerta(`¡Registro exitoso! 🎉 Gracias por registrarte, ${name}. Tu lugar para el horario ${selectedSchedule} ha sido reservado de forma digital.`, 'success');
    
    // Limpiar campos del formulario para permitir un nuevo registro
    form.reset();
  }
});