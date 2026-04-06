// listas.js

// Arreglo vacío para la lista de compras, usamos let porque podría reasignarse al filtrar
export let listaDeCompras = [];

// Función para agregar un producto validando que no haya duplicados
export const agregarProducto = (producto) => {
    // Usamos el método includes de ECMAScript para buscar si ya existe
    if (!listaDeCompras.includes(producto)) {
        listaDeCompras.push(producto); // Agrega al final de la lista
        console.log(`✅ Producto "${producto}" agregado a la lista.`);
    } else {
        console.log(`⚠️ El producto "${producto}" ya se encuentra en la lista.`);
    }
};

// Función para eliminar un producto
export const eliminarProducto = (producto) => {
    const longitudInicial = listaDeCompras.length;

    // Usamos el método filter de ECMAScript para remover el producto de forma limpia
    listaDeCompras = listaDeCompras.filter(item => item !== producto);

    if (listaDeCompras.length < longitudInicial) {
        console.log(`🗑️ Producto "${producto}" eliminado de la lista.`);
    } else {
        console.log(`❌ El producto "${producto}" no se encontró en la lista.`);
    }
};

// Función para mostrar la lista de compras
export const mostrarLista = () => {
    console.log("=== 🛒 Mi Lista de Compras ===");
    if (listaDeCompras.length === 0) {
        console.log("La lista está vacía.");
    } else {
        // Usamos forEach y Template Literals para imprimir los elementos
        listaDeCompras.forEach((producto, index) => {
            console.log(`${index + 1}. ${producto}`);
        });
    }
    console.log("==============================\n");
};
