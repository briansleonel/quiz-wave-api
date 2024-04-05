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
const api_errors_1 = require("../libs/api.errors");
const auth_service_1 = __importDefault(require("../services/auth.service"));
/**
 * Permite realizar un Inicio de Sesión en la api
 * Este devuelve un token al usuario logueado
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username && !password)
        next(new api_errors_1.BadRequestError("Ingrese datos válidos"));
    try {
        const { token, user } = yield auth_service_1.default.login(username, password);
        // envío el token en header
        res.setHeader("Authorization", "Bearer " + token);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.OK,
            message: "Ha iniciado sesión",
            data: {
                _id: user._id,
                role: user.role,
                username: user.username,
                fullName: `${user.lastName}, ${user.firstName}`,
                token,
            },
        });
    }
    catch (err) {
        next(err);
    }
});
/**
 * Permite finalizar una sesión
 *
 * @param _req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const logout = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //res.cookie("token", "", { expires: new Date(0) });
    // remuevo el header de autorización
    res.removeHeader("Authorization");
    return (0, response_handle_1.apiResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: "Sesión finalizada",
    });
});
/**
 * Permite registra un nuevo usuario en la BD
 *
 * @param req solicitud HTTP desde el cliente
 * @param res respuesta a una determinada petición del cliente
 * @returns la respuesta a la petición
 */
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body)
        next(new api_errors_1.BadRequestError("Verifique los datos ingresados"));
    try {
        const { token, user } = yield auth_service_1.default.register(req.body);
        // envío el token en header
        res.setHeader("Authorization", "Bearer " + token);
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.CREATED,
            data: {
                _id: user._id,
                role: user.role,
                username: user.username,
                fullName: `${user.lastName}, ${user.firstName}`,
                token,
            },
            message: "Cuenta creada",
        });
    }
    catch (err) {
        next(err);
    }
});
const authController = {
    login,
    logout,
    register,
};
exports.default = authController;
