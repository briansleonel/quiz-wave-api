import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { apiResponse } from "../libs/response.handle";
import config from "../config/config";
import { IdParams, TypedRequest } from "../types/request";

/**
 * Middleware que permite verificar si un "token", recibido en las cookies, es válido
 *
 * @param req
 * @param res
 * @param next función a ejecutarse si todo sale bien
 * @returns
 */
export function authRequired<T>(
    req: TypedRequest<T, IdParams>,
    res: Response,
    next: NextFunction
) {
    // Extraigo el token de la petición del cliente
    const { token } = req.cookies;

    // Verifico que se haya encontrado algún token
    if (!token)
        return apiResponse(res, {
            status: StatusCodes.UNAUTHORIZED,
            message: "No Token: Autorización denegada",
        });

    // Verifico que el token sea válido
    jwt.verify(token, config.TOKEN_SECRET, (err: any) => {
        if (err)
            return apiResponse(res, {
                status: StatusCodes.FORBIDDEN,
                message: "Token Inválido",
            });

        // Añado los datos del usuario guardados en el token
        //req.user = user;
        next();
    });
}
