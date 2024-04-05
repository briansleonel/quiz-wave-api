"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
const api_errors_1 = require("../libs/api.errors");
const jwt_1 = require("../libs/jwt");
/**
 * Middleware que permite indicar que se trata de una ruta pública al cuál se puede acceder sin estar loggeado en el sistema
 *
 * @param req
 * @param res
 * @param next función a ejecutarse si todo sale bien
 * @returns
 */
function publicRoute(req, _res, next) {
    try {
        // checkeo si existe algún token de autorización en el header
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            // Verifico si existe algún token
            if (token) {
                jsonwebtoken_1.default.verify(token, config_1.default.TOKEN_SECRET, (err) => {
                    if (err)
                        throw new api_errors_1.BadRequestError("Error inesperado");
                    // guardo los datos del token en la solicitud
                    req.auth = (0, jwt_1.getUserDataToken)(token);
                });
            }
        }
        return next();
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
exports.publicRoute = publicRoute;
