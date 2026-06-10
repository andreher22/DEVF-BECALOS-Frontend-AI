/**
 * PROYECTO: VALIDACIÓN DE FORMULARIOS CON ZOD
 * Uso de esquemas tipados para control de inputs y manejo de errores dinámicos.
 */

// 1. Importación de Zod directamente desde CDN utilizando módulos ES
import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.23.8/+esm';

// Elementos del DOM
const form = document.getElementById('registerForm');
const successAlert = document.getElementById('success-alert');

/**
 * 2. Definición del Esquema de Validación con Zod
 * Centraliza las reglas de negocio y los mensajes personalizados en español.
 */
const registerSchema = z.object({
  name: z.string()
    .min(1, { message: "El nombre es obligatorio." })
    .min(3, { message: "El nombre debe contener un mínimo de 3 caracteres." }),
    
  email: z.string()
    .min(1, { message: "El correo electrónico es obligatorio." })
    .email({ message: "Formato de correo inválido (ejemplo@dominio.com)." }),
    
  password: z.string()
    .min(1, { message: "La contraseña es obligatoria." })
    .min(6, { message: "La contraseña es muy corta (mínimo de 6 caracteres)." })
});

/**
 * Limpia todos los textos de error visuales en la interfaz
 */
function limpiarErrores() {
  document.getElementById('error-name').textContent = '';
  document.getElementById('error-email').textContent = '';
  document.getElementById('error-password').textContent = '';
}

/**
 * Renderiza los errores devueltos por Zod en sus campos correspondientes
 */
function mostrarErrores(issues) {
  // Recorremos la lista de problemas que detectó el motor de Zod
  issues.forEach(issue => {
    // El 'path[0]' contiene el nombre de la propiedad del objeto con el error (name, email o password)
    const campo = issue.path[0]; 
    const contenedorError = document.getElementById(`error-${campo}`);
    if (contenedorError) {
      contenedorError.textContent = issue.message; // Mensaje definido en el esquema
    }
  });
}

/**
 * VALIDACIÓN EN TIEMPO REAL (Opcional - Mejora de UX)
 * Valida un campo individual de forma asíncrona cuando el usuario cambia de input
 */
function configurarValidacionEnTiempoReal() {
  const inputs = ['name', 'email', 'password'];
  
  inputs.forEach(id => {
    const inputElement = document.getElementById(id);
    
    inputElement.addEventListener('input', () => {
      // Capturamos el estado actual del formulario completo
      const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value
      };
      
      // Ejecutamos validación silenciosa
      const result = registerSchema.safeParse(formData);
      
      // Limpiamos el error específico de este campo antes de evaluar
      document.getElementById(`error-${id}`).textContent = '';
      
      if (!result.success) {
        // Si hay errores, buscamos si este campo específico tiene un fallo actual
        const errorDelCampo = result.error.issues.find(issue => issue.path[0] === id);
        if (errorDelCampo) {
          document.getElementById(`error-${id}`).textContent = errorDelCampo.message;
        }
      }
    });
  });
}

// Inicializar validadores interactivos
configurarValidacionEnTiempoReal();

/**
 * Escuchador del evento de envío del formulario
 */
form.addEventListener('submit', function(event) {
  event.preventDefault(); // Detener recarga de página
  limpiarErrores();
  successAlert.classList.add('hidden');

  // Recolectar la información actual de los inputs
  const datosFormulario = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value
  };

  /**
   * 3. Validación de datos con Zod usando safeParse()
   * A diferencia de .parse(), safeParse no arroja excepciones (no rompe el código),
   * sino que devuelve un objeto con un booleano '.success'.
   */
  const resultadoValidacion = registerSchema.safeParse(datosFormulario);

  if (!resultadoValidacion.success) {
    // Si la validación falla, mapeamos los errores de Zod al DOM
    console.warn("⚠️ Falló la validación de esquema Zod:", resultadoValidacion.error.issues);
    mostrarErrores(resultadoValidacion.error.issues);
  } else {
    // Si la validación es exitosa, procesamos el objeto limpio y validado
    console.log("✅ Datos validados y listos para el servidor:", resultadoValidacion.data);
    
    // Mostrar cartel de éxito
    successAlert.textContent = `¡Registro exitoso! Bienvenido/a ${resultadoValidacion.data.name}. 🎉`;
    successAlert.classList.remove('hidden');
    
    // Resetear formulario
    form.reset();
  }
});