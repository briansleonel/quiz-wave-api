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
const response_handle_1 = require("../libs/response.handle");
const http_status_codes_1 = require("http-status-codes");
const validObjectId_1 = require("../libs/validObjectId");
const orderByRecents_query_1 = require("../query/orderByRecents.query");
const collection_query_1 = require("../query/collection.query");
const collection_service_1 = __importDefault(require("../services/collection.service"));
const api_errors_1 = require("../libs/api.errors");
const role_enum_1 = require("../enums/role.enum");
const getCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    try {
        const collection = yield collection_service_1.default.getById(id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Colección encontrada",
            data: collection,
        });
    }
    catch (error) {
        next(error);
    }
});
const getCollectionsQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Opciones de paginación de datos
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };
    // Verifico el rol de usuario que realiza la consulta. Solo el admin podrá acceder a todos los recursos. El usuario común solo puede acceder a sus recursos
    if (req.auth && req.auth.role === role_enum_1.Role.PLAYER)
        req.query.user = (_a = req.auth) === null || _a === void 0 ? void 0 : _a.id;
    // Query para el filtrado de datos
    const query = (0, collection_query_1.getQueryCollectionOr)(req);
    const recents = (0, orderByRecents_query_1.getOrderByRecents)(req);
    try {
        // Busco los datos y los pagino
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
const addCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        next(new api_errors_1.BadRequestError("No se proporcionaron datos"));
    const payload = req.body;
    payload.user = req.auth.id; // asigno el ID del usuario que se almacena en el token
    try {
        // guardo la instancia en la BD
        const collection = yield collection_service_1.default.saveCollection(payload);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Colección guardada",
            data: collection,
        });
    }
    catch (error) {
        next(error);
    }
});
const updateCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    try {
        const collection = yield collection_service_1.default.updateCollection(req.body, id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Colección actualizada",
            data: collection,
        });
    }
    catch (error) {
        next(error);
    }
});
const deleteCollection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    try {
        const collection = yield collection_service_1.default.deleteCollection(id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Colección eliminada",
            data: collection,
        });
    }
    catch (error) {
        next(error);
    }
});
const collectionController = {
    getCollection,
    getCollectionsQuery,
    addCollection,
    deleteCollection,
    updateCollection,
};
exports.default = collectionController;
