// recursion.js

// Lista principal de regalos
export const gifts = ["Muñeca", "Carro de juguete", "Rompecabezas", "Lego", "Pelota"];

// Función recursiva para encontrar un regalo
export const findGift = (gifts, giftName, index = 0) => {
    // Caso base 1: Si llegamos al final de la lista sin encontrarlo
    // (Comprobamos si index es igual a la longitud porque los índices van de 0 a length - 1)
    if (index === gifts.length) {
        return `${giftName} no está en la lista.`;
    }

    // Caso base 2: Si el regalo en la posición actual coincide con el que buscamos
    if (gifts[index] === giftName) {
        return `${giftName} está en la posición ${index}.`;
    }

    // Llamada recursiva: Si no se cumplió ninguno de los casos base, 
    // nos volvemos a llamar pero procesando el siguiente índice (+1)
    return findGift(gifts, giftName, index + 1);
};