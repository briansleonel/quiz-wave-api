"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandom = exports.generateRandomNumbers = void 0;
/**
 * Permite generar números aleatorios, en un determinado rango. Permite generar un conjunto de números aleatorios sin repetir, con una dado límite de numeros a generar.
 *
 * @param max rango maximo
 * @param limit cantidad de numeros a generar|
 * @returns array de numeros generados
 */
function generateRandomNumbers(max, limit) {
    const numbers = [];
    for (let i = 0; i < limit; i++) {
        if (numbers.length === 0)
            numbers.push(getRandom(max));
        else {
            let repeated = false;
            do {
                const num = getRandom(max);
                if (numbers.includes(num)) {
                    repeated = true;
                }
                else {
                    numbers.push(num);
                    repeated = false;
                }
            } while (repeated);
        }
    }
    return numbers;
}
exports.generateRandomNumbers = generateRandomNumbers;
/**
 * Permite generar un número entero aleatorio.
 *
 * @param max rango máximo
 * @returns un número aleatorio
 */
function getRandom(max) {
    return Math.floor(Math.random() * max) + 1;
}
exports.getRandom = getRandom;
