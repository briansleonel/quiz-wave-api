import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { IdParams, TypedRequest } from "../types/request";
import config from "../config/config";
import { BadRequestError } from "../libs/api.errors";
import { getUserDataToken } from "../libs/jwt";
import { UserPayload } from "../types/payload";

/**
 * Middleware que permite indicar que se trata de una ruta pública al cuál se puede acceder sin estar loggeado en el sistema
 *
 * @param req
 * @param res
 * @param next función a ejecutarse si todo sale bien
 * @returns
 */
export function publicRoute<T>(
    req: TypedRequest<T, IdParams>,
    _res: Response,
    next: NextFunction
) {
    try {
        // checkeo si existe algún token de autorización en el header
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];

            // Verifico si existe algún token
            if (token) {
                jwt.verify(token, config.TOKEN_SECRET, (err: any) => {
                    if (err) throw new BadRequestError("Error inesperado");

                    // guardo los datos del token en la solicitud
                    req.auth = getUserDataToken(token) as UserPayload;
                });
            }
        }

        return next();
    } catch (error) {
        throw error;
    }

    /**********************************************************
        Validación de token por cookie
    **********************************************************/
    /*
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

        return next();
    });
    */
}
