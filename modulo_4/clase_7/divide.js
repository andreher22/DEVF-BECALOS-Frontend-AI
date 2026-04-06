// divide.js

// Función que aplica la estrategia "Divide y Vencerás" para encontrar el número máximo
export const findMax = (arr) => {
    // Caso base: Si el sub-arreglo tiene solo un elemento, entonces ese es nuestro máximo potencial de esa rama
    if (arr.length === 1) {
        return arr[0];
    }
    
    // Validamos en caso el usuario coloque un arreglo totalmente vacío en la primera llamada
    if (arr.length === 0) {
        return -Infinity;
    }

    // 1. Dividir el arreglo en dos mitades
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);       // Extrae desde el inicio hasta la mitad
    const right = arr.slice(mid);         // Extrae desde la mitad hasta el final

    // 2. Llamar recursivamente a la función para ambas mitades divididas
    const leftMax = findMax(left);
    const rightMax = findMax(right);

    // 3. Combinar las soluciones verificando cuál de las recursiones trajo el valor más alto
    // Se puede usar la función matemática "Math.max(leftMax, rightMax)" o directamente una comparación ternaria
    return leftMax > rightMax ? leftMax : rightMax;
};
