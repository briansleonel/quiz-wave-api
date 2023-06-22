import { Request, Response } from "express";
import { TypedRequestBody } from "../types/request";
import { ILogin, IUser } from "../interfaces/user.interface";
import UserModel from "../models/user.model";
import { apiResponse } from "../libs/response.handle";
import { StatusCodes } from "http-status-codes";
import { comparePassword, encryptPassword } from "../libs/bcrypt";
import { createAccessToken } from "../libs/jwt";

/**
 * Permite realizar un Inicio de Sesión en la api
 * Este devuelve un token al usuario logueado
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const login = async (req: TypedRequestBody<ILogin>, res: Response) => {
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

        // Envió el cookie con el token
        res.cookie("token", token);

        // Añadir token en el header
        //res.header("authorization", token as string);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Sesión iniciada",
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
const register = async (req: TypedRequestBody<IUser>, res: Response) => {
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

        return apiResponse(res, {
            status: StatusCodes.CREATED,
            data: userSaved,
            message: "Usuario añadido",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
    }
};

const authController = {
    login,
    logout,
    register,
};

export default authController;
