// app.js

// Importamos las funciones necesarias desde nuestro módulo viajes.js
import { registrarDestino, mostrarItinerario } from './viajes.js';

// Función de flecha para iniciar la aplicación
const iniciarApp = () => {
    // Ejemplo de cómo registrar destinos con parámetros extra y nuevas opciones
    registrarDestino("Paris", "2024-06-15", "Avión", 2);
    registrarDestino("Londres", "2024-07-01", "Tren", 1);
    registrarDestino("Tokio", "2024-10-12", "Avión", 4); // Ejemplo de grupo con descuento
    registrarDestino("New York", "2024-12-05", "Autobús", 2);

    // Mostrar el itinerario de los viajes
    mostrarItinerario();
};

// Ejecutar la aplicación
iniciarApp();
