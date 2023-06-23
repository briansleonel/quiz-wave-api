const emailRegExp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

/**
 * Permite verificar que un texto sea un email
 *
 * @param email texto a verificar
 * @returns si es un email devuelve true, caso contrario false
 */
export function isEmail(email: string) {
    return emailRegExp.test(email);
}
