import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { IdParams, TypedRequest } from "../types/request";
import { ForbiddenError, UnauthorizedError } from "../libs/api.errors";
import { getUserDataToken } from "../libs/jwt";
import { UserPayload } from "../types/payload";

/**
 * Middleware que permite verificar si un "token" recibido en los Headers es válido
 * El token debe ser enviado en el header Authorization como Bearer XXX
 *
 * @param req
 * @param res
 * @param next función a ejecutarse si todo sale bien
 * @returns
 */
export function authRequired<T>(
    req: TypedRequest<T, IdParams>,
    _res: Response,
    next: NextFunction
) {
    try {
        /**********************************************************
            Validación de token por header Authorization
        **********************************************************/

        // Verifico que se envíe Authorization en los headers
        if (!req.headers.authorization) {
            throw new UnauthorizedError("Autorización denegada");
        }

        // Extraigo el token del header Authorization - se espera formato -> Bearer XXX, interesa el token en posición 1
        const token = req.headers.authorization.split(" ")[1];

        // Verifico si existe algún token
        if (!token) {
            throw new UnauthorizedError("No token: Autorización denegada");
        }

        // Verifico que el token sea válido
        jwt.verify(token, config.TOKEN_SECRET, (err: any) => {
            if (err) throw new ForbiddenError("Token inválido");

            req.auth = getUserDataToken(token) as UserPayload;

            return next();
        });
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
