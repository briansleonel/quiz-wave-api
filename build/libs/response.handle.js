"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = void 0;
/**
 * Permite devolver una serie de datos pasados como parametros en apiRes, hacia el cliente
 * Informa el estado de la petición
 *
 * @param res response de la petición
 * @param apiRes datos que serán enviados como respuesta de la petición
 */
function apiResponse(res, apiRes) {
    res.status(apiRes.status).json(apiRes);
}
exports.apiResponse = apiResponse;
