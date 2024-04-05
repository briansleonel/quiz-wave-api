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
exports.getDataToken = exports.getUserDataToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
/**
 * Permite crear un token de acceso
 *
 * @param payload datos para el token
 * @returns token creado
 */
function createAccessToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign(payload, config_1.default.TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
                if (err)
                    reject(err);
                resolve(token);
            });
        });
    });
}
exports.createAccessToken = createAccessToken;
/**
 * Permite extraer los datos almacenados en el token
 *
 * @param token el token enviado por el cliente
 * @returns datos del token
 */
function getUserDataToken(token) {
    return jsonwebtoken_1.default.decode(token);
}
exports.getUserDataToken = getUserDataToken;
/**
 * Permite decodificar los datos lamacenados en el Header de la solicitud y devolver los datos del mismo
 * @param req request de la petición HTTP
 * @returns los datos almacenados en el token
 */
function getDataToken(req) {
    const token = req.headers.authorization.split(" ")[1];
    return getUserDataToken(token);
}
exports.getDataToken = getDataToken;
