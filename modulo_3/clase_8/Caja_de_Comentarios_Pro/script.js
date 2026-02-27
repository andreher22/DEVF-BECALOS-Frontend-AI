/**
 * CLASE COMENTARIO (Encapsulamiento)
 * Esta clase define la estructura de cada unidad de datos.
 * Guardamos el autor, texto, un ID único y un arreglo de respuestas.
 */
class Comentario {
    constructor(autor, texto, id = Date.now(), respuestas = []) {
        this.id = id;
        this.autor = autor;
        this.texto = texto;
        this.respuestas = respuestas; // Permite anidación infinita (Efecto Facebook)
        this.fecha = new Date().toLocaleString();
    }
}

/**
 * CLASE GESTOR (Lógica de Negocio y Persistencia)
 * Controla el flujo de datos entre la interfaz (DOM) y el almacenamiento (LocalStorage).
 */
class GestorComentarios {
    constructor() {
        // Al iniciar, intentamos recuperar datos guardados previamente
        this.comentarios = this.cargarStorage();
        this.render(); 
    }

    // Recupera el JSON del navegador y lo convierte de vuelta a un Objeto
    cargarStorage() {
        const datos = localStorage.getItem('fb_feed');
        return datos ? JSON.parse(datos) : [];
    }

    // Convierte el Objeto a JSON y lo guarda para que no se borre al refrescar
    guardar() {
        localStorage.setItem('fb_feed', JSON.stringify(this.comentarios));
        this.render(); // Redibuja la pantalla automáticamente
    }

    /**
     * MÉTODO AGREGAR
     * Aquí corregimos el error: Capturamos los datos ANTES de cualquier otra acción.
     */
    agregar(autor, texto, parentId = null) {
        if (!texto.trim()) return; // Validación básica: no publicar vacíos

        const nuevo = new Comentario(autor, texto);

        if (!parentId) {
            // Si no tiene padre, va al muro principal
            this.comentarios.unshift(nuevo);
        } else {
            // Si es respuesta, usamos RECURSIVIDAD para hallarlo en la profundidad
            this.buscarYResponder(this.comentarios, parentId, nuevo);
        }
        this.guardar();
    }

    // Busca un comentario por ID en cualquier nivel de anidación
    buscarYResponder(lista, id, nuevo) {
        for (let c of lista) {
            if (c.id === id) {
                c.respuestas.push(nuevo);
                return true;
            }
            if (c.respuestas.length > 0) {
                if (this.buscarYResponder(c.respuestas, id, nuevo)) return true;
            }
        }
    }

    // Elimina un comentario filtrando por ID en todo el árbol de datos
    eliminar(id, lista = this.comentarios) {
        const index = lista.findIndex(c => c.id === id);
        if (index !== -1) {
            lista.splice(index, 1);
        } else {
            lista.forEach(c => this.eliminar(id, c.respuestas));
        }
        this.guardar();
    }

    /**
     * MÉTODOS DE EDICIÓN DINÁMICA
     * Permiten editar el texto directamente en la tarjeta sin usar prompts feos.
     */
    activarEdicion(id) {
        document.getElementById(`edit-form-${id}`).style.display = 'block';
        document.getElementById(`text-${id}`).style.display = 'none';
    }

    cancelarEdicion(id) {
        document.getElementById(`edit-form-${id}`).style.display = 'none';
        document.getElementById(`text-${id}`).style.display = 'block';
    }

    confirmarEdicion(id) {
        const nuevoTexto = document.getElementById(`edit-input-${id}`).value;
        this.actualizarTexto(this.comentarios, id, nuevoTexto);
        this.guardar();
    }

    actualizarTexto(lista, id, nuevoTexto) {
        for (let c of lista) {
            if (c.id === id) {
                c.texto = nuevoTexto;
                c.fecha += " (editado)";
                return true;
            }
            this.actualizarTexto(c.respuestas, id, nuevoTexto);
        }
    }

    /**
     * MÉTODO RENDER
     * Genera el HTML dinámico. Se llama a sí mismo para dibujar respuestas.
     */
    render(lista = this.comentarios, contenedor = document.getElementById('feed'), nivel = 0) {
        if (nivel === 0) contenedor.innerHTML = "";
        
        lista.forEach(c => {
            const div = document.createElement('div');
            div.className = nivel === 0 ? 'comment-card' : 'reply-card';
            div.innerHTML = `
                <span class="author-name">${c.autor}</span>
                <p id="text-${c.id}">${c.texto}</p>
                
                <div id="edit-form-${c.id}" style="display:none; margin-top:10px;">
                    <textarea id="edit-input-${c.id}" class="input-minimalist" style="height:60px">${c.texto}</textarea>
                    <button onclick="gestor.confirmarEdicion(${c.id})" class="btn-slate" style="padding:5px 10px; font-size:12px">Guardar</button>
                    <button onclick="gestor.cancelarEdicion(${c.id})" class="btn-action">Cancelar</button>
                </div>

                <small style="color:gray; display:block;">${c.fecha}</small>
                <div class="comment-footer">
                    <button class="btn-action" onclick="mostrarPromptRespuesta(${c.id})">Responder</button>
                    <button class="btn-action" onclick="gestor.activarEdicion(${c.id})">Editar</button>
                    <button class="btn-action" onclick="gestor.eliminar(${c.id})">Eliminar</button>
                </div>
                <div id="replies-${c.id}" class="replies-container"></div>
            `;
            contenedor.appendChild(div);
            if (c.respuestas.length > 0) {
                this.render(c.respuestas, div.querySelector(`#replies-${c.id}`), nivel + 1);
            }
        });
    }
}

// INSTANCIA GLOBAL
const gestor = new GestorComentarios();

// FUNCIONES DE CONTROL (Se comunican con el HTML)
function publicarPrincipal() {
    const inputNombre = document.getElementById('nombre-user');
    const inputTexto = document.getElementById('texto-msg');

    // 1. Leemos los valores primero
    const autor = inputNombre.value || "Anónimo";
    const texto = inputTexto.value;

    // 2. Si hay texto, lo mandamos al gestor
    if (texto.trim()) {
        gestor.agregar(autor, texto);
        // 3. Limpiamos los campos SOLO después de que se guardaron
        inputTexto.value = "";
    } else {
        alert("Por favor escribe un mensaje.");
    }
}

function mostrarPromptRespuesta(id) {
    const nombre = prompt("Tu nombre:");
    const msg = prompt("Tu respuesta:");
    if (nombre && msg) gestor.agregar(nombre, msg, id);
}