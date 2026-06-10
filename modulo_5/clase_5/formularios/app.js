/**
 * PROYECTO: MANEJO Y VALIDACIÓN DE FORMULARIOS CON JAVASCRIPT
 * Código del lado del cliente encargado del control, captura y filtrado de datos.
 */

// Seleccionar elementos del DOM
const form = document.getElementById('eventForm');
const alertContainer = document.getElementById('alert-container');

/**
 * Función para mostrar alertas
 */
function mostrarAlerta(mensaje, tipo) {

  alertContainer.innerHTML = '';
  alertContainer.className = `alert alert-${tipo}`;

  if (Array.isArray(mensaje)) {

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
 * Evento submit del formulario
 */
form.addEventListener('submit', function(event) {

  // Evita envío automático
  event.preventDefault();

  // Ocultar alertas previas
  alertContainer.classList.add('hidden');

  // Capturar datos
  const name = document.getElementById('name').value.trim();

  const email = document.getElementById('email').value.trim();

  const phone = document.getElementById('phone').value.trim();

  const eventDateValue =
    document.getElementById('eventDate').value;

  const idFileElement =
    document.getElementById('idFile');

  // Checkboxes
  const checkedInterests = Array.from(
    document.querySelectorAll(
      'input[name="interests"]:checked'
    )
  ).map(checkbox => checkbox.value);

  // Radio button
  const selectedSchedule =
    document.querySelector(
      'input[name="schedule"]:checked'
    )?.value;

  // Archivo
  const uploadedFile = idFileElement.files[0];

  // Array errores
  const errores = [];

  // ==========================================
  // VALIDACIONES
  // ==========================================

  // Nombre
  if (!name) {
    errores.push(
      "El campo 'Nombre Completo' es obligatorio."
    );
  }

  // Email
  if (!email) {

    errores.push(
      "El campo 'Correo Electrónico' es obligatorio."
    );

  } else if (!email.includes('@')) {

    errores.push(
      "Introduce un correo electrónico válido."
    );
  }

  // Teléfono
  const phoneRegex = /^\d{10}$/;

  if (!phone) {

    errores.push(
      "El campo 'Teléfono de Contacto' es obligatorio."
    );

  } else if (!phoneRegex.test(phone)) {

    errores.push(
      "El teléfono debe contener exactamente 10 dígitos."
    );
  }

  // Intereses
  if (checkedInterests.length === 0) {

    errores.push(
      "Debes seleccionar al menos un área de interés."
    );
  }

  // Horario
  if (!selectedSchedule) {

    errores.push(
      "Debes seleccionar un horario."
    );
  }

  // Fecha
  if (!eventDateValue) {

    errores.push(
      "Debes seleccionar una fecha."
    );

  } else {

    const fechaSeleccionada =
      new Date(eventDateValue + "T00:00:00");

    const fechaActual = new Date();

    fechaActual.setHours(0, 0, 0, 0);

    if (fechaSeleccionada <= fechaActual) {

      errores.push(
        "La fecha debe ser posterior al día actual."
      );
    }
  }

  // ==========================================
  // RESULTADO
  // ==========================================

  if (errores.length > 0) {

    mostrarAlerta(errores, 'error');

  } else {

    console.log("📊 Datos enviados:", {

      asistente: name,
      correo: email,
      telefono: phone,
      intereses: checkedInterests,
      horario: selectedSchedule,
      fechaEvento: eventDateValue,
      archivoAdjunto:
        uploadedFile
          ? uploadedFile.name
          : "Ninguno"

    });

    mostrarAlerta(
      `¡Registro exitoso! 🎉 Gracias por registrarte, ${name}.`,
      'success'
    );

    form.reset();
  }

});