import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IdParams, TypedRequest } from "../types/request";
import { apiResponse } from "../libs/response.handle";
import { ILogin, IUser } from "../types/user";
import { BadRequestError } from "../libs/api.errors";
import authService from "../services/auth.service";

/**
 * Permite realizar un Inicio de Sesión en la api
 * Este devuelve un token al usuario logueado
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const login = async (
    req: TypedRequest<ILogin, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body;

    if (!username && !password)
        next(new BadRequestError("Ingrese datos válidos"));

    try {
        const { token, user } = await authService.login(username, password);

        // envío el token en header
        res.setHeader("Authorization", "Bearer " + token);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Ha iniciado sesión",
            data: {
                _id: user._id,
                role: user.role,
                username: user.username,
                fullName: `${user.lastName}, ${user.firstName}`,
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Permite finalizar una sesión
 *
 * @param _req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const logout = async (_req: Request, res: Response) => {
    //res.cookie("token", "", { expires: new Date(0) });

    // remuevo el header de autorización
    res.removeHeader("Authorization");

    return apiResponse(res, {
        status: StatusCodes.OK,
        message: "Sesión finalizada",
    });
};

/**
 * Permite registra un nuevo usuario en la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const register = async (
    req: TypedRequest<IUser, IdParams>,
    res: Response,
    next: NextFunction
) => {
    if (!req.body) next(new BadRequestError("Verifique los datos ingresados"));

    try {
        const { token, user } = await authService.register(req.body);

        // envío el token en header
        res.setHeader("Authorization", "Bearer " + token);

        return apiResponse(res, {
            status: StatusCodes.CREATED,
            data: {
                _id: user._id,
                role: user.role,
                username: user.username,
                fullName: `${user.lastName}, ${user.firstName}`,
                token,
            },
            message: "Cuenta creada",
        });
    } catch (err) {
        next(err);
    }
};

const authController = {
    login,
    logout,
    register,
};

export default authController;
