// Seleccionamos los elementos del DOM
const input = document.querySelector("#comentarioInput");
const btnAgregar = document.querySelector("#btnAgregar");
const contenedor = document.querySelector("#listaComentarios");

// Escuchamos el evento click
btnAgregar.addEventListener("click", () => {
    const texto = input.value.trim();

    // Validamos que no esté vacío
    if (texto === "") {
        alert("Por favor, escribe algo antes de publicar.");
        return;
    }

    // Creamos el contenedor del comentario
    const nuevoComentario = document.createElement("div");
    nuevoComentario.classList.add("comentario");

    // Obtenemos fecha y hora actual
    const ahora = new Date();
    const fechaTexto = ahora.toLocaleString();

    // Insertamos contenido usando innerHTML (incluyendo botón eliminar)
    nuevoComentario.innerHTML = `
        <span class="fecha">${fechaTexto}</span>
        <p>${texto}</p>
        <button class="btn-eliminar">Eliminar</button>
    `;

    // Agregamos funcionalidad al botón eliminar del comentario específico
    nuevoComentario.querySelector(".btn-eliminar").addEventListener("click", () => {
        nuevoComentario.remove();
    });

    // Añadimos el comentario a la lista y limpiamos el input
    contenedor.appendChild(nuevoComentario);
    input.value = "";
});