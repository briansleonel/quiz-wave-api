import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import QuestionCategoryModel from "../models/questionCategory.model";
import { apiResponse } from "../libs/response.handle";
import { isValidId } from "../libs/validObjectId";
import {
    IdParams,
    TypedRequest,
    //TypedRequestBody,
    //TypedRequestParams,
} from "../types/request";
import { IQuestionCategory } from "../types/questionCategory";

/**
 * Permite realizar la consulta de una "Category" en la BD, a partir de un determinado :id, recibido a través del req.params
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Category
 */
const getCategory = async (
    req: TypedRequest<IQuestionCategory, IdParams>,
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
 * Permite devolver todas la Categories disponibles en la BD usando querys
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. Si todo sale bien, devuelve todas las "Categories"
 */
const getAllQuery = async (
    req: TypedRequest<IQuestionCategory, IdParams>,
    res: Response
) => {
    const query = {};
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    try {
        // Busco los datos y los pagino
        const categories = await QuestionCategoryModel.paginate(query, options);

        // excluyo los datos que no quiero enviar en el response
        const { docs, offset, meta, totalDocs, ...restData } = categories;

        //console.log(restData);

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: categories.docs,
            message: "Datos encontrados",
            pagination: {
                totalData: categories.totalDocs,
                ...restData,
            },
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err as string,
        });
    }
};

const getAll = async (
    _req: TypedRequest<IQuestionCategory, IdParams>,
    res: Response
) => {
    try {
        // Busco los datos y los pagino
        const categories = await QuestionCategoryModel.find({});

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: categories,
            message: "Datos encontrados",
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
    req: TypedRequest<IQuestionCategory, IdParams>,
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
            message: "Categoría guardada",
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
    req: TypedRequest<IQuestionCategory, IdParams>,
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
    getAllQuery,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
    getAll,
};

export default questionCategoryController;
