import { NextFunction, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IdParams, TypedRequest } from "../types/request";
import { isValidId } from "../libs/validObjectId";
import { apiResponse } from "../libs/response.handle";
import { getQueryQuestionOr } from "../query/question.query";
import { IQuestion, IQuestionDTO } from "../types/question";
import { getOrderByRecents } from "../query/orderByRecents.query";
import { BadRequestError } from "../libs/api.errors";
import questionService from "../services/question.service";

/**
 * Permite devolver una Pregunta, de acuerdo a la coincidencia con algún ID
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const getQuestion = async (
    req: TypedRequest<IQuestion, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    try {
        const question = await questionService.getById(id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Pregunta encontrado",
            data: question,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Permite devolver todas las preguntas almacenadas en la BD
 *
 * @param _req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const getAll = async (
    req: TypedRequest<IQuestion, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    const query = getQueryQuestionOr(req);

    const recents = getOrderByRecents(req);

    try {
        // Busco los datos y los pagino
        const { data, pagination } = await questionService.getByQuery(
            query,
            options,
            recents
        );

        return apiResponse(res, {
            status: StatusCodes.OK,
            message:
                pagination.totalData > 0 ? "Datos encontrados" : "Sin datos",
            data,
            pagination,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Permite agregar una nueva pregunta a la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const addQuestion = async (
    req: TypedRequest<IQuestionDTO, IdParams>,
    res: Response,
    next: NextFunction
) => {
    if (!req.body) next(new BadRequestError("No se proporcionaron datos"));

    if (!isValidId(req.body.user))
        next(new BadRequestError("Id de usuario inválido"));

    if (!isValidId(req.body.category))
        next(new BadRequestError("Id de categoría inválido"));

    try {
        const question = await questionService.saveQuestion(req.body);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Pregunta guardada",
            data: question,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Permita actualizar los datos de una determinada Pregunta
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const updateQuestion = async (
    req: TypedRequest<IQuestionDTO, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    if (!req.body) next(new BadRequestError("No se proporcionaron datos"));

    if (!isValidId(req.body.user))
        next(new BadRequestError("Id de usuario inválido"));

    if (!isValidId(req.body.category))
        next(new BadRequestError("Id de categoría inválido"));

    try {
        const question = await questionService.updateQuestion(req.body, id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Pregunta actualizada",
            data: question,
        });
    } catch (err) {
        next(err);
    }
};

/**
 * Permite eliminar una pregunta, dado un ID en req.params
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const deleteQuestion = async (
    req: TypedRequest<IQuestionDTO, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    try {
        const question = await questionService.deleteQuestion(id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Pregunta eliminada",
            data: question,
        });
    } catch (err) {
        next(err);
    }
};

const changeVerified = async (
    req: TypedRequest<IQuestionDTO, IdParams>,
    res: Response,
    next: NextFunction
) => {
    const { id } = req.params;

    if (!isValidId(id)) next(new BadRequestError("Id inválido"));

    try {
        await questionService.changeVerified(id);

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Verificación actualizada",
        });
    } catch (err) {
        next(err);
    }
};

const questionController = {
    getAll,
    getQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    changeVerified,
};

export default questionController;
