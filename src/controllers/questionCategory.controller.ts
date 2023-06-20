import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import QuestionCategoryModel from "../models/questionCategory.model";
import { apiResponse } from "../libs/response.handle";
import { isValidId } from "../libs/validObjectId";
import {
    IdParams,
    TypedRequest,
    TypedRequestBody,
    TypedRequestParams,
} from "../types/request";
import { IQuestionCategory } from "../interfaces/questionCategory.interface";

/*
interface Category {
    getAll: (req: Request, res: Response) => Promise<void>;
}
*/

/**
 * Permite realizar la consulta de una "Category" en la BD, a partir de un determinado :id, recibido a través del req.params
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Category
 */
const getCategory = async (
    req: TypedRequestParams<IdParams>,
    res: Response
) => {
    const { id } = req.params;

    if (!isValidId(id))
        // verifica si el :id ingresado es valido
        return apiResponse(res, {
            // status : StatusCodes.NO_CONTENT,
            status: StatusCodes.BAD_REQUEST,
            data: null,
            message: "Id inválido",
        });

    try {
        const categoryFound = await QuestionCategoryModel.findById(id);

        if (!categoryFound)
            // verifico si se encontró el dato
            return apiResponse(res, {
                status: StatusCodes.NO_CONTENT,
                data: null,
                message: "Categoría no encontrada",
            });

        // envio el dato encontrado
        return apiResponse(res, {
            status: StatusCodes.OK,
            data: categoryFound,
            message: "Categoría encontrada",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err as string,
        });
    }
};

/**
 * Permite devolver todas la Categories disponibles en la BD.
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. Si todo sale bien, devuelve todas las "Categories"
 */
const getAll = async (_req: Request, res: Response) => {
    try {
        const categories = await QuestionCategoryModel.find({});
        return apiResponse(res, {
            status: StatusCodes.OK,
            data: categories,
            message: "Todas las categorías",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err as string,
        });
    }
};

/**
 * Permite añadir una nueva categoría a la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. Si todo sale bien, devuelve la categoría creada
 */
const addCategory = async (
    req: TypedRequestBody<IQuestionCategory>,
    res: Response
) => {
    // Verifico que se envien los datos en el body
    if (!req.body)
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            data: null,
            message: "Sin datos",
        });

    const newCategory = new QuestionCategoryModel(req.body);

    try {
        const categorySaved = await newCategory.save();

        return apiResponse(res, {
            status: StatusCodes.CREATED,
            data: categorySaved,
            message: "Categoría añadida",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err as string,
        });
    }
};

/**
 * Permite actualizar una Categoría, dado los datos a actualizar en req.body, de acuerdo a un :id dado en req.params
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. Si todo sale bien, devuelve la categoría actuaizada
 */
const updateCategory = async (
    req: TypedRequest<IQuestionCategory, IdParams>,
    res: Response
) => {
    const { id } = req.params;

    // Verifico que se envien los datos en el body
    if (!req.body)
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            data: null,
            message: "Sin datos",
        });

    try {
        const categoryFound = await QuestionCategoryModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true, // Indicio que me devuelva el objeto actualizado
            }
        );

        if (!categoryFound)
            // verifico si se encontró alguna categoría
            return apiResponse(res, {
                status: StatusCodes.NO_CONTENT,
                data: null,
                message: "Categoría no ecnontrada",
            });

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: categoryFound,
            message: "Categoría actualizada",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err as string,
        });
    }
};

/**
 * Permite eliminar una Categoría de la BD, de acuerdo a un :id
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. Si todo sale bien, devuelve la categoría eliminada
 */
const deleteCategory = async (
    req: TypedRequestParams<IdParams>,
    res: Response
) => {
    const { id } = req.params;

    try {
        const categoryFound = await QuestionCategoryModel.findByIdAndDelete(id);

        if (!categoryFound)
            return apiResponse(res, {
                status: StatusCodes.NO_CONTENT,
                data: null,
                message: "Categoría no ecnontrada",
            });

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: categoryFound,
            message: "Categoría eliminada",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err as string,
        });
    }
};

const questionCategoryController = {
    getAll,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};

export default questionCategoryController;
