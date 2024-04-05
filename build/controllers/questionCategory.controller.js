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
const response_handle_1 = require("../libs/response.handle");
const validObjectId_1 = require("../libs/validObjectId");
const api_errors_1 = require("../libs/api.errors");
const questionCategory_service_1 = __importDefault(require("../services/questionCategory.service"));
/**
 * Permite realizar la consulta de una "Category" en la BD, a partir de un determinado :id, recibido a través del req.params
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición de una determinada Category
 */
const getCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    try {
        const category = yield questionCategory_service_1.default.getById(id);
        // envio el dato encontrado
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            data: category,
            message: "Categoría encontrada",
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite devolver todas la Categories disponibles en la BD usando querys
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. Si todo sale bien, devuelve todas las "Categories"
 */
const getAllQuery = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    const options = {
        page: req.query.page ? Number(req.query.page) : 1,
        limit: req.query.limit ? Number(req.query.limit) : 10,
    };
    try {
        // Busco los datos y los pagino
        const categories = yield questionCategory_service_1.default.getByQuery(query, options);
        const { data, pagination } = categories;
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            data,
            message: "Datos encontrados",
            pagination,
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite añadir una nueva categoría a la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. Si todo sale bien, devuelve la categoría creada
 */
const addCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Verifico que se envien los datos en el body
    if (!req.body)
        next(new api_errors_1.BadRequestError("No se proporcionaron datos"));
    try {
        const category = yield questionCategory_service_1.default.saveCategory(req.body);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.CREATED,
            data: category,
            message: "Categoría guardada",
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite actualizar una Categoría, dado los datos a actualizar en req.body, de acuerdo a un :id dado en req.params
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. Si todo sale bien, devuelve la categoría actuaizada
 */
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    // Verifico que se envien los datos en el body
    if (!req.body)
        next(new api_errors_1.BadRequestError("No se proporcionaron datos válidos"));
    try {
        const category = yield questionCategory_service_1.default.updateCategory(req.body, id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            data: category,
            message: "Categoría actualizada",
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite eliminar una Categoría de la BD, de acuerdo a un :id
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición. Si todo sale bien, devuelve la categoría eliminada
 */
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id))
        next(new api_errors_1.BadRequestError("Id inválido"));
    try {
        const category = yield questionCategory_service_1.default.deleteCategory(id);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            data: category,
            message: "Categoría eliminada",
        });
    }
    catch (err) {
        next(err);
    }
});
const questionCategoryController = {
    getAllQuery,
    addCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
exports.default = questionCategoryController;
