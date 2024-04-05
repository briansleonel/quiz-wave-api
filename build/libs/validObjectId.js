"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidId = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Permite verificar que un texto sea un tipo de ID válido para mongoose
 *
 * @param id cadena de texto a verificar si es un tipo de ID válido
 * @returns true si el exto es un ID válido, caso contrairo devuelve false
 */
function isValidId(id) {
    return mongoose_1.default.Types.ObjectId.isValid(id);
}
exports.isValidId = isValidId;
