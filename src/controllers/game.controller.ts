import { Response } from "express";
import { IQuestion } from "../types/question";
import { GameParams, TypedRequest } from "../types/request";
import { isValidId } from "../libs/validObjectId";
import { apiResponse } from "../libs/response.handle";
import { StatusCodes } from "http-status-codes";
import QuestionModel from "../models/question.model";
import { generateRandomNumbers } from "../libs/random";
import QuestionCategoryModel from "../models/questionCategory.model";
import { IQuestionCategoryWithId } from "../types/questionCategory";

export interface GameQuery {
    category?: string;
    verified?: boolean;
}

const playGame = async (
    req: TypedRequest<IQuestion, GameParams>,
    res: Response
) => {
    // parametro recibido en el path
    const { category, limit = 1 } = req.params;

    // query para la busqueda de preguntas
    let query: GameQuery = { verified: true };

    // Arreglo para las preguntas a enviar
    const questions: Array<IQuestion> = [];

    // Verifico si se envía un id de categoría que este sea válido
    if (category !== "random" && !isValidId(category))
        return apiResponse(res, {
            status: StatusCodes.BAD_REQUEST,
            message: "Id inválido",
        });

    // si se envío un ID de categoría, lo asigno a la query
    if (category && category !== "random") query.category = category;

    try {
        // Busco todas las preguntas en la BD usando la query
        const questionsFound = await QuestionModel.find(query).populate(
            "category"
        );

        // conjunto de números para preguntas aleatorios
        const numbersRandom = generateRandomNumbers(
            questionsFound.length,
            limit
        );

        // agrego a "questions" las preguntas encontradas en la BD coincidentes en el index de cada elemento
        numbersRandom.forEach((e) => questions.push(questionsFound[e]));

        return apiResponse(res, {
            message: `Total: ${limit} preguntas - Categoría: ${
                category === "random" ? "Aletario" : questions[0].category.name
            }`,
            status: StatusCodes.OK,
            data: questions,
        });
    } catch (error) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: error as string,
        });
    }
};

const getCategoriesGame = async (
    _req: TypedRequest<IQuestionCategoryWithId, GameParams>,
    res: Response
) => {
    try {
        // Busco todas las categorías
        const categories = await QuestionCategoryModel.find({});

        // Creo un array para las categorías a mostrar
        let categoriesShow: Array<IQuestionCategoryWithId> = [];

        // Recorro el array de categorías
        for (let cat of categories) {
            // cuento los documentos de preguntas que conitenen una determinada categoría
            const count = await QuestionModel.count({
                category: cat,
            });
            // Si es mayor a 10, se agrega a las categorías a mostrar
            if (count >= 10) {
                categoriesShow.push(cat);
            }
        }

        return apiResponse(res, {
            status: StatusCodes.OK,
            data: categoriesShow,
            message: "Mostrando categorías para iniciar el juego",
        });
    } catch (err) {
        return apiResponse(res, {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err as string,
        });
    }
};

const gameController = {
    playGame,
    getCategoriesGame,
};

export default gameController;
