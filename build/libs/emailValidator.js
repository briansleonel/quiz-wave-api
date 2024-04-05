"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmail = void 0;
const emailRegExp = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
/**
 * Permite verificar que un texto sea un email
 *
 * @param email texto a verificar
 * @returns si es un email devuelve true, caso contrario false
 */
function isEmail(email) {
    return emailRegExp.test(email);
}
exports.isEmail = isEmail;
