import { IdParams, TypedRequest } from "../../types/request";
import { getUserDataToken } from "../../libs/jwt";
import { UserPayload } from "../../types/payload";
import { Role } from "../../enums/role.enum";
import { BadRequestError } from "../../libs/api.errors";
import { NextFunction, Response } from "express";

/**
 * Middleware que permite verificar que el usuario que intenta realizar una operación en el sistema sea de rol ADMIN
 * @param req solicitud del cliente
 * @param res respuesta del servidor
 * @param next proxima acción a realizar
 * @returns
 */
export function verifyRoleAdmin<T>(
    req: TypedRequest<T, IdParams>,
    _res: Response,
    next: NextFunction
) {
    try {
        // Extraigo el token del header Authorization - se espera formato -> Bearer XXX, interesa el token en posición 1
        const token = req.headers.authorization!.split(" ")[1];

        const dataToken = getUserDataToken(token) as UserPayload;

        // verifico que el usuario tenga el Rol de administraor para realizar la operacion
        if (dataToken && dataToken.role === Role.ADMIN) {
            return next();
        }

        next(new BadRequestError("Unauthorized user"));
    } catch (error) {
        throw error;
    }
}
