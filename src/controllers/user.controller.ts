import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { IdParams, TypedRequest } from "../types/request";
import { isValidId } from "../libs/validObjectId";
import { apiResponse } from "../libs/response.handle";
import { getQueryUserOr } from "../query/user.query";
import { IUser } from "../types/user";
import userService from "../services/user.service";
import { BadRequestError } from "../libs/api.errors";

/**
 * Permite devolver un Usuario, de acuerdo a la coincidencia con algún ID
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinado Usuario
 */
const getUser = async (
    req: TypedRequest<IUser, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    // Verifico que el ID sea un tipo válido
    if (!isValidId(id)) next(new BadRequestError("ID inválido"));

    try {
        const userFound = await userService.getUser(id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Usuario encontrado",
            data: userFound,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Permite devolver todos los usuarios de la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. SI todo sale bien devuelve los usuarios.
 */
const getAll = async (
    req: TypedRequest<IUser, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    const query = getQueryUserOr(req);

    try {
        const { data, pagination, totalDocs } =
            await userService.getFilteredUsers(query, options);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message:
                totalDocs > 0
                    ? `Se muestran ${totalDocs} resultados.`
                    : "No se encontraron resultados",
            data,
            pagination,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Permite añadir un nuevo usuario a la BD **ELIMINAR CONTROLADOR**
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const addUser = async (
    req: TypedRequest<IUser, IdParams>,
    res: Response,
    next: NextFunction
) => {
    if (!req.body) next(new BadRequestError("No se proporcionaron datos"));

    try {
        const userSaved = await userService.addUser(req.body);

        return apiResponse(res, {
            status: StatusCodes.CREATED,
            data: userSaved,
            message: "Usuario guardado",
        });
    } catch (err) {
        next(err);
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
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    // Verifico que el ID sea un tipo válido
    if (!isValidId(id)) next(new BadRequestError("ID inválido"));

    if (!req.body) throw new BadRequestError("No se proporcionaron datos");

    try {
        const user = await userService.updateUser(req.body, id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: user,
            message: "Usuario actualizado",
        });
    } catch (err) {
        next(err);
    }
};

const changeVerifiedUser = async (
    req: TypedRequest<IUser, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    // Verifico que el ID sea un tipo válido
    if (!isValidId(id)) next(new BadRequestError("ID inválido"));

    try {
        const userChanged = await userService.changeverifiedUser(id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: userChanged.verified
                ? "Se ha verificado el usuario"
                : "Se ha quitado la verificación del usuario",
        });
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (
    req: TypedRequest<IUser, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;
    if (!isValidId(id)) next(new BadRequestError("ID inválido"));

    try {
        const userDeleted = await userService.deleteUser(id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: userDeleted,
            message: "Usuario eliminado",
        });
    } catch (err) {
        next(err);
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
