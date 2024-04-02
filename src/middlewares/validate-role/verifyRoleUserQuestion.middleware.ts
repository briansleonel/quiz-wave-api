import { NextFunction, Response } from "express";
import { IdParams, TypedRequest } from "../../types/request";
import { Role } from "../../libs/role.enum";
import questionRepository from "../../repositories/question.repository";
import { getUserDataToken } from "../../libs/jwt";
import { UserPayload } from "../../types/payload";
import { UnauthorizedError } from "../../libs/api.errors";

/**
 * Middleware que permite verificar el rol de un usuario, y comprobar si puede o no realizar ciertas acciones en el sistema con respecto a las preguntas almacenadas en él
 * @param req solicitud del cliente
 * @param res respuesta del servidor
 * @param next proxima acción a realizar
 * @returns
 */
export async function verifyRoleUserQuestion<T>(
    req: TypedRequest<T, IdParams>,
    _res: Response,
    next: NextFunction
) {
    try {
        const { id } = req.params;

        // Extraigo el token del header Authorization - se espera formato -> Bearer XXX, interesa el token en posición 1
        const token = req.headers.authorization!.split(" ")[1];

        const dataToken = getUserDataToken(token) as UserPayload;

        // verifico que el usuario tenga el Rol de administraor para realizar la operacion
        if (dataToken && dataToken.role === Role.ADMIN) {
            return next();
        }

        // Busco la pregunta por su ID recibido en los parametros
        const questionFound = await questionRepository.getById(id);

        // Verifico si existe una pregunta encontrada
        if (questionFound) {
            // Verifico que el ID del usuario correspondiente a la pregunta sea el mismo que el del token
            if (questionFound.user.toString() === dataToken.id) {
                return next();
            }
        }

        // si no se encontró el usuario, o no es el propietario del recurso, lanzo una excepción
        next(
            new UnauthorizedError("Autorización denegada: Acción no permitida")
        );
    } catch (error) {
        throw error;
    }
}
