import mongoose from "mongoose";

/**
 * Permite verificar que un texto sea un tipo de ID válido para mongoose
 *
 * @param id cadena de texto a verificar si es un tipo de ID válido
 * @returns true si el exto es un ID válido, caso contrairo devuelve false
 */
export function isValidId(id: string) {
    return mongoose.Types.ObjectId.isValid(id);
}
