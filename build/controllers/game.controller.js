"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validObjectId_1 = require("../libs/validObjectId");
const response_handle_1 = require("../libs/response.handle");
const http_status_codes_1 = require("http-status-codes");
const question_model_1 = __importDefault(require("../models/question.model"));
const random_1 = require("../libs/random");
const questionCategory_model_1 = __importDefault(require("../models/questionCategory.model"));
const playGame = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // parametro recibido en el path
    const { category, limit = 1 } = req.params;
    // query para la busqueda de preguntas
    let query = { verified: true };
    // Arreglo para las preguntas a enviar
    const questions = [];
    // Verifico si se envía un id de categoría que este sea válido
    if (category !== "random" && !(0, validObjectId_1.isValidId)(category))
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: "Id inválido",
        });
    // si se envío un ID de categoría, lo asigno a la query
    if (category && category !== "random")
        query.category = category;
    try {
        // Busco todas las preguntas en la BD usando la query
        const questionsFound = yield question_model_1.default.find(query).populate("category");
        // conjunto de números para preguntas aleatorios
        const numbersRandom = (0, random_1.generateRandomNumbers)(questionsFound.length, limit);
        // agrego a "questions" las preguntas encontradas en la BD coincidentes en el index de cada elemento
        numbersRandom.forEach((e) => questions.push(questionsFound[e]));
        return (0, response_handle_1.apiResponse)(res, {
            message: `Total: ${limit} preguntas - Categoría: ${category === "random" ? "Aletario" : questions[0].category.name}`,
            status: http_status_codes_1.StatusCodes.OK,
            data: questions,
        });
    }
    catch (error) {
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            message: error,
        });
    }
});
const getCategoriesGame = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Busco todas las categorías
        const categories = yield questionCategory_model_1.default.find({});
        // Creo un array para las categorías a mostrar
        let categoriesShow = [];
        // Recorro el array de categorías
        for (let cat of categories) {
            // cuento los documentos de preguntas que conitenen una determinada categoría
            const count = yield question_model_1.default.count({
                category: cat,
            });
            // Si es mayor a 10, se agrega a las categorías a mostrar
            if (count >= 10) {
                categoriesShow.push(cat);
            }
        }
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            data: categoriesShow,
            message: "Mostrando categorías para iniciar el juego",
        });
    }
    catch (err) {
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err,
        });
    }
});
const gameController = {
    playGame,
    getCategoriesGame,
};
exports.default = gameController;
