"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const response_handle_1 = require("../libs/response.handle");
const api_errors_1 = require("../libs/api.errors");
const http_status_codes_1 = require("http-status-codes");
/**
 * Middleware que permite verificar si se lanza algún error en los controladores, y permite manejar dicho error enviando una respuesta apropiada
 * @param error error provisto desde el controlador
 * @param _req
 * @param res respuesta de la solicitud
 * @param _next
 * @returns error ocurrido como un json
 */
const errorHandlerMiddleware = (error, _req, res, _next) => {
    var _a;
    // Primero verifico si es instancia de alguno de mis errores controlados
    if (error instanceof api_errors_1.ApiResponseError)
        return (0, response_handle_1.apiResponse)(res, {
            status: error.statusCode,
            message: error.message,
        });
    else
        (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            message: (_a = error.message) !== null && _a !== void 0 ? _a : "Servicio no disponible",
        });
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
