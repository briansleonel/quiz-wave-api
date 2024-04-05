"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderByRecents = void 0;
/**
 * Permite devolver el orden de busqueda de la consulta.
 * Se puede ordenar el resultado de la búsqueda por los creados recientemente, o los más antiguos.
 * @param req petición del cliente
 * @returns 1 si se ordena por los más recientes, -1 en caso contrario
 */
function getOrderByRecents(req) {
    return !req.query.recents || req.query.recents === "true" ? -1 : 1;
}
exports.getOrderByRecents = getOrderByRecents;
