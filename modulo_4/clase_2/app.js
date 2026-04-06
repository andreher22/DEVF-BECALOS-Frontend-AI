// app.js

// Importamos las funciones necesarias
import { agregarProducto, eliminarProducto, mostrarLista } from './listas.js';

// Función para iniciar la app y probar los casos de uso
const iniciarApp = () => {
    console.log("Inicializando Gestion de Lista de Compras...\n");

    // Mostramos la lista inicialmente vacía
    mostrarLista();

    // Agregamos varios productos
    agregarProducto("Manzanas");
    agregarProducto("Leche");
    agregarProducto("Pan");
    
    // Tratamos de agregar un producto duplicado (la validación saltará)
    agregarProducto("Leche");

    // Mostramos la lista
    mostrarLista();

    // Eliminamos un producto
    eliminarProducto("Leche");

    // Tratamos de eliminar un producto que no existe
    eliminarProducto("Arroz");

    // Mostramos la lista final
    mostrarLista();
};

// Ejecutar la aplicación
iniciarApp();
