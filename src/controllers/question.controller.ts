import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IdParams, TypedRequest } from "../types/request";
import { isValidId } from "../libs/validObjectId";
import { apiResponse } from "../libs/response.handle";
import QuestionModel from "../models/question.model";
import { getOrderByRecents, getQueryQuestionOr } from "../query/question.query";
import { IQuestion, IQuestionDTO } from "../types/question";

/**
 * Permite devolver una Pregunta, de acuerdo a la coincidencia con algún ID
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const getQuestion = async (
    req: TypedRequest<IQuestion, IdParams>,
    res: Response
) => {
    const { id } = req.params;

    if (!isValidId(id))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id inválido",
        });

    try {
        const questionFound = await QuestionModel.findById(id).populate(
            "category"
        );
        if (!questionFound)
            return apiResponse(res, {
                status: StatusCodes.NO_CONTENT,
                message: "Pregunta no encontrada",
            });

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Pregunta encontrado",
            data: questionFound,
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
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
    res: Response
) => {
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };

    const query = getQueryQuestionOr(req);

    try {
        // Busco los datos y los pagino
        const questions = await QuestionModel.paginate(query, {
            ...options,
            populate: [
                { path: "category" },
                //{ path: "user", select: "username" },
            ],
            sort: {
                createdAt: getOrderByRecents(req),
            },
        });

        // excluyo los datos que no quiero enviar en el response
        const { docs, offset, meta, totalDocs, ...restData } = questions;

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: totalDocs > 0 ? "Datos encontrados" : "Sin datos",
            data: questions.docs,
            pagination: {
                totalData: questions.totalDocs,
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
 * Permite agregar una nueva pregunta a la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const addQuestion = async (
    req: TypedRequest<IQuestionDTO, IdParams>,
    res: Response
) => {
    if (!req.body)
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Sin datos",
        });

    if (!isValidId(req.body.user))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id usuario inválido",
        });

    if (!isValidId(req.body.category))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id categoría inválido",
        });

    const newQuestion = new QuestionModel(req.body);

    try {
        const questionSaved = await newQuestion.save();

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Pregunta guardada",
            data: questionSaved,
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
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

    if (!isValidId(req.body.user))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id usuario inválido",
        });

    if (!isValidId(req.body.category))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id categoría inválido",
        });

    try {
        const questionUpdated = await QuestionModel.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!questionUpdated)
            return apiResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: "Pregunta no guardada",
            });

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Pregunta actualizada",
            data: questionUpdated,
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
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
    res: Response
) => {
    const { id } = req.params;

    if (!isValidId(id))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id inválido",
        });

    try {
        const questionDeleted = await QuestionModel.findByIdAndDelete(id);
        if (!questionDeleted)
            return apiResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: "Pregunta no eliminada",
            });

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Pregunta eliminada",
            data: questionDeleted,
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
    }
};

const changeVerified = async (
    req: TypedRequest<IQuestionDTO, IdParams>,
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
        const questionFound = await QuestionModel.findById(id);

        if (!questionFound)
            return apiResponse(res, {
                status: StatusCodes.NO_CONTENT,
                message: "Pregunta no encontrado",
            });

        await QuestionModel.findByIdAndUpdate(
            id,
            { verified: !questionFound?.verified },
            {
                new: true,
            }
        );

        return apiResponse(res, {
            status: StatusCodes.OK,
            message: "Verificación actualizada",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: err as string,
        });
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
