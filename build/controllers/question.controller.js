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
const http_status_codes_1 = require("http-status-codes");
const validObjectId_1 = require("../libs/validObjectId");
const response_handle_1 = require("../libs/response.handle");
const question_query_1 = require("../query/question.query");
const orderByRecents_query_1 = require("../query/orderByRecents.query");
const api_errors_1 = require("../libs/api.errors");
const question_service_1 = __importDefault(require("../services/question.service"));
const role_enum_1 = require("../enums/role.enum");
/**
 * Permite devolver una Pregunta, de acuerdo a la coincidencia con algún ID
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const getQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    try {
        const question = yield question_service_1.default.getById(id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Pregunta encontrado",
            data: question,
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite devolver todas las preguntas almacenadas en la BD
 *
 * @param _req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };
    // Verifico el rol de usuario que realiza la consulta. Solo el admin podrá acceder a todos los recursos. El usuario común solo puede acceder a sus recursos
    if (req.auth && req.auth.role === role_enum_1.Role.PLAYER)
        req.query.user = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.id;
    const query = (0, question_query_1.getQueryQuestionOr)(req);
    const recents = (0, orderByRecents_query_1.getOrderByRecents)(req);
    try {
        // Busco los datos y los pagino
        const { data, pagination } = yield question_service_1.default.getByQuery(query, options, recents);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: pagination.totalData > 0 ? "Datos encontrados" : "Sin datos",
            data,
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite agregar una nueva pregunta a la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const addQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    payload.user = req.auth.id; // asigno el ID del usuario que se almacena en el token
    try {
        const question = yield question_service_1.default.saveQuestion(payload);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Pregunta guardada",
            data: question,
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permita actualizar los datos de una determinada Pregunta
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const updateQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    try {
        const question = yield question_service_1.default.updateQuestion(req.body, id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Pregunta actualizada",
            data: question,
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite eliminar una pregunta, dado un ID en req.params
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Pregunta
 */
const deleteQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    try {
        const question = yield question_service_1.default.deleteQuestion(id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Pregunta eliminada",
            data: question,
        });
    }
    catch (err) {
        next(err);
    }
});
const changeVerified = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    try {
        yield question_service_1.default.changeVerified(id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Verificación actualizada",
        });
    }
    catch (err) {
        next(err);
    }
});
const questionController = {
    getAll,
    getQuestion,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    changeVerified,
};
exports.default = questionController;
