import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import cookie from "cookie";
import { IdParams, TypedRequest } from "../types/request";
import UserModel from "../models/user.model";
import { apiResponse } from "../libs/response.handle";
import { comparePassword, encryptPassword } from "../libs/bcrypt";
import { createAccessToken } from "../libs/jwt";
import { ILogin, IUser } from "../types/user";

/**
 * Permite realizar un Inicio de Sesión en la api
 * Este devuelve un token al usuario logueado
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const login = async (req: TypedRequest<ILogin, IdParams>, res: Response) => {
    const { username, password } = req.body;

    if (!username && !password)
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Ingrese datos válidos",
        });

    try {
        // Busco el usuario de acuerdo a su username
        const userFound = await UserModel.findOne({ username });
        // Si no se encontró nada, envió la respuesta al cliente
        if (!userFound)
            return apiResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: "Nombre de usuario no encontrado",
            });

        // Verifico si las contraseñas coinciden
        const isMatch = await comparePassword(password, userFound.password);
        if (!isMatch)
            return apiResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: "Credenciales inválidas",
            });

        // Creo el token de acceso para el usuario logueado
        const token = await createAccessToken({
            id: userFound._id,
            role: userFound.role,
        });

        // Añadir token en el header
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token as string, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24,
                path: "/",
            })
        );

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Ha iniciado sesión",
            data: {
                _id: userFound._id,
                role: userFound.role,
                username: userFound.username,
                fullName: `${userFound.lastName}, ${userFound.firstName}`,
            },
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err instanceof Error ? err.message : (err as string),
        });
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
    res.cookie("token", "", { expires: new Date(0) });

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
const register = async (req: TypedRequest<IUser, IdParams>, res: Response) => {
    if (!req.body)
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Sin datos",
        });

    // Encripto la contraseña
    const passwordHashed = await encryptPassword(req.body.password);
    // Creo el objeto para un nuevo usuario, con la contraseña encryptada
    const newUser = new UserModel({ ...req.body, password: passwordHashed });

    try {
        const userSaved = await newUser.save();

        // Creo el token de acceso para el usuario logueado
        const token = await createAccessToken({
            id: userSaved._id,
            role: userSaved.role,
        });

        // Añadir token en el header
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("token", token as string, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                sameSite: "strict",
                maxAge: 60 * 60 * 24,
                path: "/",
            })
        );

        return apiResponse(res, {
            status: StatusCodes.CREATED,
            data: {
                _id: userSaved._id,
                role: userSaved.role,
                username: userSaved.username,
                fullName: `${userSaved.lastName}, ${userSaved.firstName}`,
            },
            message: "Se ha creado su cuenta",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err instanceof Error ? err.message : (err as string),
        });
    }
};

const authController = {
    login,
    logout,
    register,
};

export default authController;
