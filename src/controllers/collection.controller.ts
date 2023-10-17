import { Response } from "express";
import { IdParams, TypedRequest } from "../types/request";
import { ICollectionDTO } from "../types/collection";
import { apiResponse } from "../libs/response.handle";
import { StatusCodes } from "http-status-codes";
import CollectionModel from "../models/collection.model";
import { isValidId } from "../libs/validObjectId";

const getCollection = async (
    _req: TypedRequest<ICollectionDTO, IdParams>,
    _res: Response
) => {};

const getCollectionsQuery = async (
    _req: TypedRequest<ICollectionDTO, IdParams>,
    _res: Response
) => {};

const addCollection = async (
    req: TypedRequest<ICollectionDTO, IdParams>,
    res: Response
) => {
    // Verifico que el ID del usuario enviado sea válido
    if (!isValidId(req.body.user))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id usuario inválido",
        });

    // instanciar un Collection con losd atos recibidos en el body
    const newCollection = new CollectionModel(req.body);

    try {
        // guardo la instancia en la BD
        const collectionSaved = await newCollection.save();

        // Verifico que se haya guardado el nuevo objeto
        if (!collectionSaved)
            return apiResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: "Colleción no guardada",
            });

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Colleción guardada",
            data: collectionSaved,
        });
    } catch (error) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error as string,
        });
    }
};

const updateCollection = async (
    _req: TypedRequest<ICollectionDTO, IdParams>,
    _res: Response
) => {};

const deleteCollection = async (
    _req: TypedRequest<ICollectionDTO, IdParams>,
    _res: Response
) => {};

const collectionController = {
    getCollection,
    getCollectionsQuery,
    addCollection,
    deleteCollection,
    updateCollection,
};

export default collectionController;
