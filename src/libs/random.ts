/**
 * Permite generar números aleatorios, en un determinado rango. Permite generar un conjunto de números aleatorios sin repetir, con una dado límite de numeros a generar.
 *
 * @param max rango maximo
 * @param limit cantidad de numeros a generar|
 * @returns array de numeros generados
 */
export function generateRandomNumbers(max: number, limit: number) {
    const numbers: Array<number> = [];

    for (let i = 0; i < limit; i++) {
        if (numbers.length === 0) numbers.push(getRandom(max));
        else {
            let repeated = false;
            do {
                const num = getRandom(max);

                if (numbers.includes(num)) {
                    repeated = true;
                } else {
                    numbers.push(num);
                    repeated = false;
                }
            } while (repeated);
        }
    }

    return numbers;
}

/**
 * Permite generar un número entero aleatorio.
 *
 * @param max rango máximo
 * @returns un número aleatorio
 */
export function getRandom(max: number) {
    return Math.floor(Math.random() * max) + 1;
}
