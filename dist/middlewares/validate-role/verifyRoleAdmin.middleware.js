"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRoleAdmin = void 0;
const jwt_1 = require("../../libs/jwt");
const role_enum_1 = require("../../enums/role.enum");
const api_errors_1 = require("../../libs/api.errors");
/**
 * Middleware que permite verificar que el usuario que intenta realizar una operación en el sistema sea de rol ADMIN
 * @param req solicitud del cliente
 * @param res respuesta del servidor
 * @param next proxima acción a realizar
 * @returns
 */
function verifyRoleAdmin(req, _res, next) {
    try {
        // Extraigo el token del header Authorization - se espera formato -> Bearer XXX, interesa el token en posición 1
        const token = req.headers.authorization.split(" ")[1];
        const dataToken = (0, jwt_1.getUserDataToken)(token);
        // verifico que el usuario tenga el Rol de administraor para realizar la operacion
        if (dataToken && dataToken.role === role_enum_1.Role.ADMIN) {
            return next();
        }
        next(new api_errors_1.BadRequestError("Unauthorized user"));
    }
    catch (error) {
        throw error;
    }
}
exports.verifyRoleAdmin = verifyRoleAdmin;
