import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IdParams, TypedRequest } from "../types/request";
import { isValidId } from "../libs/validObjectId";
import { apiResponse } from "../libs/response.handle";
import UserModel from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

/**
 * Permite devolver un Usuario, de acuerdo a la coincidencia con algún ID
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinado Usuario
 */
const getUser = async (req: TypedRequest<IUser, IdParams>, res: Response) => {
    const { id } = req.params;

    // Verifico que el ID sea un tipo válido
    if (!isValidId(id))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id inválido",
        });

    try {
        const userFound = await UserModel.findById(id);
        if (!userFound)
            return apiResponse(res, {
                status: StatusCodes.NO_CONTENT,
                message: "Usuario no encontrado",
            });

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Usuario encontrado",
            data: userFound,
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
    }
};

/**
 * Permite devolver todos los usuarios de la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. SI todo sale bien devuelve los usuarios.
 */
const getAll = async (_req: TypedRequest<IUser, IdParams>, res: Response) => {
    try {
        const users = await UserModel.find({});

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Todos los usuarios",
            data: users,
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
    }
};

/**
 * Permite añadir un nuevo usuario a la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const addUser = async (req: TypedRequest<IUser, IdParams>, res: Response) => {
    if (!req.body)
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Sin datos",
        });

    const newUser = new UserModel(req.body);

    try {
        const userSaved = await newUser.save();

        return apiResponse(res, {
            status: StatusCodes.CREATED,
            data: userSaved,
            message: "Usuario guardado",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
    }
};

/**
 * Permite actualizar los datos de un usuario, dado un determinado ID en req.params, y sus datos nuevos en req.body
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición.
 */
const updateUser = async (
    req: TypedRequest<IUser, IdParams>,
    res: Response
) => {
    const { id } = req.params;
    if (!isValidId(id))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id inválido",
        });

    if (!req.body)
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Sin datos",
        });

    try {
        const userFound = await UserModel.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        if (!userFound)
            return apiResponse(res, {
                status: StatusCodes.NO_CONTENT,
                message: "Usuario no encontrado",
            });

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: userFound,
            message: "Usuario actualizado",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
    }
};
const deleteUser = async (
    req: TypedRequest<IUser, IdParams>,
    res: Response
) => {
    const { id } = req.params;
    if (!isValidId(id))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id inválido",
        });

    try {
        const userDeleted = await UserModel.findByIdAndDelete(id);

        if (!userDeleted)
            return apiResponse(res, {
                status: StatusCodes.NO_CONTENT,
                message: "Usuario no encontrado",
            });

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: userDeleted,
            message: "Usuario eliminado",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
    }
};

const userController = {
    getAll,
    getUser,
    addUser,
    updateUser,
    deleteUser,
};

export default userController;
