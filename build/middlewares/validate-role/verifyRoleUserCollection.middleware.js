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
exports.verifyRoleUserCollection = void 0;
const jwt_1 = require("../../libs/jwt");
const collection_repository_1 = __importDefault(require("../../repositories/collection.repository"));
const role_enum_1 = require("../../enums/role.enum");
const api_errors_1 = require("../../libs/api.errors");
/**
 * Middleware que permite verificar el rol de un usuario, y comprobar si puede o no realizar ciertas acciones en el sistema con respecto a las colecciones almacenadas en él
 * @param req solicitud del cliente
 * @param res respuesta del servidor
 * @param next proxima acción a realizar
 * @returns
 */
function verifyRoleUserCollection(req, _res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            // Extraigo el token del header Authorization - se espera formato -> Bearer XXX, interesa el token en posición 1
            const token = req.headers.authorization.split(" ")[1];
            const dataToken = (0, jwt_1.getUserDataToken)(token);
            // verifico que el usuario tenga el Rol de administraor para realizar la operacion
            if (dataToken && dataToken.role === role_enum_1.Role.ADMIN) {
                return next();
            }
            // Busco la pregunta por su ID recibido en los parametros
            const collectionFound = yield collection_repository_1.default.getById(id);
            // Verifico si existe una pregunta encontrada
            if (collectionFound) {
                // Verifico que el ID del usuario correspondiente a la pregunta sea el mismo que el del token
                if (collectionFound.user.toString() === dataToken.id) {
                    return next();
                }
            }
            // si no se encontró el usuario, o no es el propietario del recurso, lanzo una excepción
            next(new api_errors_1.UnauthorizedError("Autorización denegada: Acción no permitida"));
        }
        catch (error) {
            throw error;
        }
    });
}
exports.verifyRoleUserCollection = verifyRoleUserCollection;
