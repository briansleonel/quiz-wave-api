import { NextFunction, Response } from "express";
import { IdParams, TypedRequest } from "../types/request";
import { apiResponse } from "../libs/response.handle";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { Role } from "../libs/role.enum";

interface UserPayload {
    id: string;
    role: Role;
    iat: number;
    exp: number;
}

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
