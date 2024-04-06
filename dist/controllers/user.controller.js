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
const user_query_1 = require("../query/user.query");
const user_service_1 = __importDefault(require("../services/user.service"));
const api_errors_1 = require("../libs/api.errors");
const question_query_1 = require("../query/question.query");
const orderByRecents_query_1 = require("../query/orderByRecents.query");
const question_service_1 = __importDefault(require("../services/question.service"));
const collection_service_1 = __importDefault(require("../services/collection.service"));
/**
 * Permite devolver un Usuario, de acuerdo a la coincidencia con algún ID
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinado Usuario
 */
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Verifico que el ID sea un tipo válido
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("ID inválido"));
    try {
        const userFound = yield user_service_1.default.getUser(id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Usuario encontrado",
            data: userFound,
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite devolver todos los usuarios de la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. SI todo sale bien devuelve los usuarios.
 */
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };
    const query = (0, user_query_1.getQueryUserOr)(req);
    try {
        const { data, pagination, totalDocs } = yield user_service_1.default.getFilteredUsers(query, options);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: totalDocs > 0
                ? `Se muestran ${totalDocs} resultados.`
                : "No se encontraron resultados",
            data,
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite añadir un nuevo usuario a la BD **ELIMINAR CONTROLADOR**
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        next(new api_errors_1.BadRequestError("No se proporcionaron datos"));
    try {
        const userSaved = yield user_service_1.default.addUser(req.body);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.CREATED,
            data: userSaved,
            message: "Usuario guardado",
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite actualizar los datos de un usuario, dado un determinado ID en req.params, y sus datos nuevos en req.body
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición.
 */
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Verifico que el ID sea un tipo válido
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("ID inválido"));
    if (!req.body)
        throw new api_errors_1.BadRequestError("No se proporcionaron datos");
    try {
        const user = yield user_service_1.default.updateUser(req.body, id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            data: user,
            message: "Usuario actualizado",
        });
    }
    catch (err) {
        next(err);
    }
});
const changeVerifiedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    // Verifico que el ID sea un tipo válido
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("ID inválido"));
    try {
        const userChanged = yield user_service_1.default.changeverifiedUser(id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: userChanged.verified
                ? "Se ha verificado el usuario"
                : "Se ha quitado la verificación del usuario",
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("ID inválido"));
    try {
        const userDeleted = yield user_service_1.default.deleteUser(id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            data: userDeleted,
            message: "Usuario eliminado",
        });
    }
    catch (err) {
        next(err);
    }
});
const getQuestionsFromUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };
    req.query.user = req.params.id;
    const query = (0, question_query_1.getQueryQuestionOr)(req);
    const recents = (0, orderByRecents_query_1.getOrderByRecents)(req);
    try {
        const { data, pagination } = yield question_service_1.default.getByQuery(query, options, recents);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: pagination.totalData > 0 ? "Datos encontrados" : "Sin datos",
            data,
            pagination,
        });
    }
    catch (error) {
        next(error);
    }
});
const getCollectionsFromUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };
    req.query.user = req.params.id;
    const query = (0, question_query_1.getQueryQuestionOr)(req);
    const recents = (0, orderByRecents_query_1.getOrderByRecents)(req);
    try {
        const { data, pagination } = yield collection_service_1.default.getFilteredQuery(query, recents, options);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: pagination.totalData > 0 ? "Datos encontrados" : "Sin datos",
            data,
            pagination,
        });
    }
    catch (error) {
        next(error);
    }
});
const userController = {
    getAll,
    getUser,
    addUser,
    updateUser,
    deleteUser,
    changeVerifiedUser,
    getQuestionsFromUser,
    getCollectionsFromUser,
};
exports.default = userController;
