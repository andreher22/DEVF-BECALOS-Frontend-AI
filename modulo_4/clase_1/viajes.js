// viajes.js

// Array constante para guardar los destinos
export const destinos = [];

// Función de flecha para calcular el costo del viaje (incluye opciones adicionales)
export const calcularCosto = (destino, transporte, numPersonas = 1) => {
    let costoBase = 0;

    // Costo base por destino
    switch (destino) {
        case "Paris": costoBase = 500; break;
        case "Londres": costoBase = 400; break;
        case "New York": costoBase = 600; break;
        case "Tokio": costoBase = 800; break; // Nuevo destino opcional
        default: costoBase = 300; break;
    }

    // Costo adicional por tipo de transporte
    if (transporte === "Avión") costoBase += 200;
    else if (transporte === "Tren") costoBase += 100;
    else if (transporte === "Autobús") costoBase += 50; // Nuevo transporte

    let costoTotal = costoBase * numPersonas;

    // Descuento del 10% para grupos de más de 3 personas
    if (numPersonas > 3) {
        costoTotal *= 0.9;
    }

    return costoTotal;
};

// Función de flecha para registrar un destino de viaje
export const registrarDestino = (destino, fecha, transporte, numPersonas = 1) => {
    // Uso de "object shorthand" para asignar propiedades usando el mismo nombre que los parámetros
    const nuevoViaje = {
        destino,
        fecha,
        transporte,
        numPersonas,
        costo: calcularCosto(destino, transporte, numPersonas)
    };

    destinos.push(nuevoViaje);
};

// Función de flecha para mostrar el itinerario usando desestructuración y Template Literals
export const mostrarItinerario = () => {
    // Recorremos con forEach en lugar del for tradicional
    destinos.forEach(({ destino, fecha, transporte, numPersonas, costo }) => {
        console.log(`Destino: ${destino}`);
        console.log(`Fecha: ${fecha}`);
        console.log(`Transporte: ${transporte}`);
        console.log(`Número de Personas: ${numPersonas}`);
        console.log(`Costo Total: $${costo.toFixed(2)}`);
        console.log("---------------------------");
    });
};
