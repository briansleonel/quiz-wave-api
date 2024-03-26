import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { apiResponse } from "../libs/response.handle";
import { isValidId } from "../libs/validObjectId";
import { IdParams, TypedRequest } from "../types/request";
import { IQuestionCategory } from "../types/questionCategory";
import { BadRequestError } from "../libs/api.errors";
import questionCategoryService from "../services/questionCategory.service";

/**
 * Permite realizar la consulta de una "Category" en la BD, a partir de un determinado :id, recibido a través del req.params
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Category
 */
const getCategory = async (
    req: TypedRequest<IQuestionCategory, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    try {
        const category = await questionCategoryService.getById(id);

        // envio el dato encontrado
        return apiResponse(res, {
            status: StatusCodes.OK,
            data: category,
            message: "Categoría encontrada",
        });
    } catch (err) {
        next(err);
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
    res: Response,
    next: NextFunction
) => {
    const query = {};
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    try {
        // Busco los datos y los pagino
        const categories = await questionCategoryService.getByQuery(
            query,
            options
        );

        const { data, pagination } = categories;

        return apiResponse(res, {
            status: StatusCodes.OK,
            data,
            message: "Datos encontrados",
            pagination,
        });
    } catch (err) {
        next(err);
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
    res: Response,
    next: NextFunction
) => {
    // Verifico que se envien los datos en el body
    if (!req.body) next(new BadRequestError("No se proporcionaron datos"));

    try {
        const category = await questionCategoryService.saveCategory(req.body);

        return apiResponse(res, {
            status: StatusCodes.CREATED,
            data: category,
            message: "Categoría guardada",
        });
    } catch (err) {
        next(err);
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
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    // Verifico que se envien los datos en el body
    if (!req.body)
        next(new BadRequestError("No se proporcionaron datos válidos"));

    try {
        const category = await questionCategoryService.updateCategory(
            req.body,
            id
        );

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: category,
            message: "Categoría actualizada",
        });
    } catch (err) {
        next(err);
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
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    try {
        const category = await questionCategoryService.deleteCategory(id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: category,
            message: "Categoría eliminada",
        });
    } catch (err) {
        next(err);
    }
};

const questionCategoryController = {
    getAllQuery,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};

export default questionCategoryController;
