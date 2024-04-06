"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRequired = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const api_errors_1 = require("../libs/api.errors");
const jwt_1 = require("../libs/jwt");
/**
 * Middleware que permite verificar si un "token" recibido en los Headers es válido
 * El token debe ser enviado en el header Authorization como Bearer XXX
 *
 * @param req
 * @param res
 * @param next función a ejecutarse si todo sale bien
 * @returns
 */
function authRequired(req, _res, next) {
    try {
        /**********************************************************
            Validación de token por header Authorization
        **********************************************************/
        // Verifico que se envíe Authorization en los headers
        if (!req.headers.authorization) {
            throw new api_errors_1.UnauthorizedError("Autorización denegada");
        }
        // Extraigo el token del header Authorization - se espera formato -> Bearer XXX, interesa el token en posición 1
        const token = req.headers.authorization.split(" ")[1];
        // Verifico si existe algún token
        if (!token) {
            throw new api_errors_1.UnauthorizedError("No token: Autorización denegada");
        }
        // Verifico que el token sea válido
        jsonwebtoken_1.default.verify(token, config_1.default.TOKEN_SECRET, (err) => {
            if (err)
                throw new api_errors_1.ForbiddenError("Token inválido");
            req.auth = (0, jwt_1.getUserDataToken)(token);
            return next();
        });
    }
    catch (error) {
        throw error;
    }
    /**********************************************************
        Validación de token por cookie
    **********************************************************/
    /*
    // Extraigo el token de la petición del cliente
    const { token } = req.cookies;

    // Verifico que se haya encontrado algún token
    if (!token)
        return apiResponse(res, {
            status: StatusCodes.UNAUTHORIZED,
            message: "No Token: Autorización denegada",
        });

    // Verifico que el token sea válido
    jwt.verify(token, config.TOKEN_SECRET, (err: any) => {
        if (err)
            return apiResponse(res, {
                status: StatusCodes.FORBIDDEN,
                message: "Token Inválido",
            });

        return next();
    });
    */
}
exports.authRequired = authRequired;
