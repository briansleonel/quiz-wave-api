import { NextFunction, Request, Response } from "express";
import { apiResponse } from "../libs/response.handle";
import { ApiResponseError } from "../libs/api.errors";
import { StatusCodes } from "http-status-codes";

/**
 * Middleware que permite verificar si se lanza algún error en los controladores, y permite manejar dicho error enviando una respuesta apropiada
 * @param error error provisto desde el controlador
 * @param _req
 * @param res respuesta de la solicitud
 * @param _next
 * @returns error ocurrido como un json
 */
export const errorHandlerMiddleware = (
    error: ApiResponseError | Error,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    // Primero verifico si es instancia de alguno de mis errores controlados
    if (error instanceof ApiResponseError)
        return apiResponse(res, {
            status: error.statusCode,
            message: error.message,
        });
    else
        apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error.message ?? "Servicio no disponible",
        });
};
