// ===================================================
// PRÁCTICA: Comparaciones y toma de decisiones
// ===================================================

// 1. Declaramos la variable 'nota' con un valor entre 0 y 100
let nota = 85; // Puedes cambiar este valor para probar (45, 60, 75, 0, 95)

// 2. Verificamos si la nota es mayor que 0 (Evaluación Truthy / Validación)
if (nota > 0) {
    
    // 3. Determinamos el rango usando operadores de comparación y lógicos
    
    if (nota >= 90) {
        // Rango: 90 a 100
        console.log("Tu nota es: " + nota + ". ¡Aprobaste con Excelente! 🌟");
    } 
    else if (nota >= 75 && nota <= 89) {
        // Rango: 75 a 89 (Uso del operador AND para el rango)
        console.log("Tu nota es: " + nota + ". ¡Aprobaste con Bien! 👍");
    } 
    else if (nota >= 60 && nota <= 74) {
        // Rango: 60 a 74
        console.log("Tu nota es: " + nota + ". ¡Aprobaste con Suficiente! 👌");
    } 
    else {
        // Cualquier nota menor a 60 (pero mayor a 0 por el primer if)
        console.log("Tu nota es: " + nota + ". Lo siento, no apruebas. 📚");
    }

} else if (nota === 0) {
    // Caso específico para nota igual a 0
    console.log("Tu nota es 0. Es necesario esforzarse más.");
} else {
    // Caso para valores negativos o no válidos
    console.log("Por favor, ingresa una nota válida.");
}

/* ADICIONAL: Prueba de valores sugeridos
   Si nota = 45 -> Imprime "No apruebas"
   Si nota = 60 -> Imprime "Suficiente"
   Si nota = 75 -> Imprime "Bien"
   Si nota = 0  -> Entra en el bloque de nota 0
*/