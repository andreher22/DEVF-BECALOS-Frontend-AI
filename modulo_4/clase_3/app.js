// app.js

import { productos } from './productos.js';

const iniciarApp = () => {
    console.log("================ BIENVENIDO A LA TIENDA ONLINE ================\n");

    // 1. filter(): Filtrar los productos que cuesten menos de $100
    // Recordatorio: filter devuelve un arreglo nuevo
    const productosBaratos = productos.filter(producto => producto.precio < 100);
    console.log("🛒 PRODUCTOS MENORES A $100:");
    console.log(productosBaratos);
    console.log("--------------------------------------------------\n");

    // 2. sort(): Ordenar los productos filtrados alfabéticamente por su nombre
    // Utilizamos localeCompare que es excelente para ordenar strings de manera alfabética
    const productosOrdenados = productosBaratos.sort((a, b) => a.nombre.localeCompare(b.nombre));
    console.log("🔤 PRODUCTOS MENORES A $100 ORDENADOS ALFABÉTICAMENTE:");
    console.log(productosOrdenados);
    console.log("--------------------------------------------------\n");

    // 3. map(): Generar un nuevo arreglo que contenga solo los nombres de los productos ordenados
    // map devuelve un arreglo con el resultado de la transformación para cada elemento
    const nombresDeProductos = productosOrdenados.map(producto => producto.nombre);
    console.log("🏷️ SOLO NOMBRES DE ESTOS PRODUCTOS:");
    console.log(nombresDeProductos);
    console.log("--------------------------------------------------\n");

    // 4. (Opcional) reduce(): Calcular el precio total si compráramos todos esos productos baratos
    // reduce recorre y acumula en una variable (total) empezando desde el valor inicial pasado, que es 0
    const costoTotalBaratos = productosBaratos.reduce((total, producto) => total + producto.precio, 0);
    console.log(`💰 COSTO TOTAL DE LA LISTA ORDENADA: $${costoTotalBaratos}`);
    console.log("--------------------------------------------------\n");

    // 5. (Opcional) some() & every(): Comprobaciones lógicas
    // Verificamos si en la lista general de productos HAY al menos ALGUNO en la categoría "Accesorios"
    const hayAccesorios = productos.some(producto => producto.categoria === "Accesorios");
    console.log(`¿Vendemos accesorios en la tienda? ${hayAccesorios ? "Sí" : "No"}`);

    // Verificamos si TODOS los elementos en el inventario cuestan menos de $500
    const todosPrecioAccesible = productos.every(producto => producto.precio < 500);
    console.log(`¿Todos los productos del inventario cuestan bajo $500? ${todosPrecioAccesible ? "Sí" : "No"}`);
    console.log("===============================================================");
};

// Ejecutar la prueba
iniciarApp();
