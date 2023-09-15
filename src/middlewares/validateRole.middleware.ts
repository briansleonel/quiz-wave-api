import { NextFunction, Response } from "express";
import { IdParams, TypedRequest } from "../types/request";
import { apiResponse } from "../libs/response.handle";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Role } from "../libs/role.enum";
import QuestionModel from "../models/question.model";

interface UserPayload {
    id: string;
    role: Role;
    iat: number;
    exp: number;
}

/**
 * Middleware que permite verificar que el usuario que intenta realizar una operación en el sistema sea de rol ADMIN
 * @param req solicitud del cliente
 * @param res respuesta del servidor
 * @param next proxima acción a realizar
 * @returns
 */
export function validateRoleAdmin<T>(
    req: TypedRequest<T, IdParams>,
    res: Response,
    next: NextFunction
) {
    try {
        // Extraigo el token de la petición del cliente
        const { token } = req.cookies;

        const dataToken = jwt.decode(token) as UserPayload;

        // verifico que el usuario tenga el Rol de administraor para realizar la operacion
        if (dataToken && dataToken.role === Role.ADMIN) {
            return next();
        }

        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Autorización denegada",
        });
    } catch (error) {
        if (error instanceof Error) {
            return apiResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: error.message,
            });
        }

        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: error as string,
        });
    }
}

/**
 * Middleware que permite verificar el rol de un usuario, y comprobar si puede o no realizar ciertas acciones en el sistema con respecto a las preguntas almacenadas en él
 * @param req solicitud del cliente
 * @param res respuesta del servidor
 * @param next proxima acción a realizar
 * @returns
 */
export async function valiateRoleUserQuestion<T>(
    req: TypedRequest<T, IdParams>,
    res: Response,
    next: NextFunction
) {
    try {
        // Extraigo el token de la petición del cliente
        const { token } = req.cookies;

        const { id } = req.params;

        const dataToken = jwt.decode(token) as UserPayload;

        // verifico que el usuario tenga el Rol de administraor para realizar la operacion
        if (dataToken && dataToken.role === Role.ADMIN) {
            return next();
        }

        // Busco la pregunta por su ID recibido en los parametros
        const questionFound = await QuestionModel.findById(id);

        // Verifico si existe una pregunta encontrada
        if (questionFound) {
            // Verifico que el ID del usuario correspondiente a la pregunta sea el mismo que el del token
            if (questionFound.user.toString() === dataToken.id) return next();
        }

        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Autorización denegada: Acción no permitida",
        });
    } catch (error) {
        if (error instanceof Error) {
            return apiResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: error.message,
            });
        }

        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: error as string,
        });
    }
}
