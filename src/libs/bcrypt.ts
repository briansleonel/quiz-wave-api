import bcrypt from "bcryptjs";

/**
 * Permite encriptar una determinada contraseña
 *
 * @param password contraseña a encriptar
 * @returns contraseña encriptada
 */
export async function encryptPassword(password: string) {
    return await bcrypt.hash(password, 15);
}

/**
 * Permite verificar si la contraseña ingresada coincide con la contraseña encriptada.
 *
 * @param password contraseña
 * @param passwordHashed contraseña encriptada
 * @returns true si coincide, false en caso contrario
 */
export async function comparePassword(
    password: string,
    passwordHashed: string
) {
    return await bcrypt.compare(password, passwordHashed);
}
