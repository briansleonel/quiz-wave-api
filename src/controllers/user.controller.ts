import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IdParams, TypedRequest } from "../types/request";
import { isValidId } from "../libs/validObjectId";
import { apiResponse } from "../libs/response.handle";
import UserModel from "../models/user.model";
import { IUser } from "../interfaces/user.interface";
import { getQueryUserOr } from "../query/user.query";

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
const getAll = async (req: TypedRequest<IUser, IdParams>, res: Response) => {
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    const query = getQueryUserOr(req);

    try {
        // Busco los datos y los pagino
        const users = await UserModel.paginate(query, options);

        // excluyo los datos que no quiero enviar en el response
        const { docs, offset, meta, totalDocs, ...restData } = users;

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: totalDocs > 0 ? "Datos encontrados" : "Sin datos",
            data: users.docs,
            pagination: {
                totalData: users.totalDocs,
                ...restData,
            },
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

const changeVerifiedUser = async (
    req: TypedRequest<IUser, IdParams>,
    res: Response
) => {
    const { id } = req.params;

    // Verifico que el ID sea un ID de mongoose válido
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

        const userChange = await UserModel.findByIdAndUpdate(
            id,
            { verified: !userFound?.verified },
            {
                new: true,
            }
        );

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: userChange?.verified
                ? "Se ha verificado el usuario"
                : "Se ha quitado la verificación del usuario",
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
    changeVerifiedUser,
};

export default userController;
