import { NextFunction, Response } from "express";
import { IdParams, TypedRequest } from "../types/request";
import { ICollectionDTO } from "../types/collection";
import { apiResponse } from "../libs/response.handle";
import { StatusCodes } from "http-status-codes";
import { isValidId } from "../libs/validObjectId";
import { getOrderByRecents } from "../query/orderByRecents.query";
import { getQueryCollectionOr } from "../query/collection.query";
import collectionService from "../services/collection.service";
import { BadRequestError } from "../libs/api.errors";
import { Role } from "../enums/role.enum";

const getCollection = async (
    req: TypedRequest<ICollectionDTO, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    try {
        const collection = await collectionService.getById(id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Colección encontrada",
            data: collection,
        });
    } catch (error) {
        next(error);
    }
};

const getCollectionsQuery = async (
    req: TypedRequest<ICollectionDTO, IdParams>,
    res: Response,
    next: NextFunction
) => {
    // Opciones de paginación de datos
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    // Verifico el rol de usuario que realiza la consulta. Solo el admin podrá acceder a todos los recursos. El usuario común solo puede acceder a sus recursos
    if (req.auth && req.auth.role === Role.PLAYER)
        req.query.user = req.auth?.id;

    // Query para el filtrado de datos
    const query = getQueryCollectionOr(req);
    const recents = getOrderByRecents(req);

    try {
        // Busco los datos y los pagino
        const { data, pagination } = await collectionService.getFilteredQuery(
            query,
            recents,
            options
        );

        return apiResponse(res, {
            status: StatusCodes.OK,
            message:
                pagination.totalData > 0 ? "Datos encontrados" : "Sin datos",
            data,
            pagination,
        });
    } catch (error) {
        next(error);
    }
};

const addCollection = async (
    req: TypedRequest<ICollectionDTO, IdParams>,
    res: Response,
    next: NextFunction
) => {
    if (!req.body) next(new BadRequestError("No se proporcionaron datos"));

    const payload = req.body;
    payload.user = req.auth!.id; // asigno el ID del usuario que se almacena en el token

    try {
        // guardo la instancia en la BD
        const collection = await collectionService.saveCollection(payload);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Colección guardada",
            data: collection,
        });
    } catch (error) {
        next(error);
    }
};

const updateCollection = async (
    req: TypedRequest<ICollectionDTO, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    try {
        const collection = await collectionService.updateCollection(
            req.body,
            id
        );

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Colección actualizada",
            data: collection,
        });
    } catch (error) {
        next(error);
    }
};

const deleteCollection = async (
    req: TypedRequest<ICollectionDTO, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    try {
        const collection = await collectionService.deleteCollection(id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Colección eliminada",
            data: collection,
        });
    } catch (error) {
        next(error);
    }
};

const collectionController = {
    getCollection,
    getCollectionsQuery,
    addCollection,
    deleteCollection,
    updateCollection,
};

export default collectionController;
