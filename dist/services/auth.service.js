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
const api_errors_1 = require("../libs/api.errors");
const bcrypt_1 = require("../libs/bcrypt");
const jwt_1 = require("../libs/jwt");
const user_service_1 = __importDefault(require("./user.service"));
function login(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFound = yield user_service_1.default.findUserByUsername(username);
            // verifico si las contraseñas coinciden
            const isMatch = yield (0, bcrypt_1.comparePassword)(password, (yield userFound).password);
            if (!isMatch)
                throw new api_errors_1.BadRequestError("Credenciales inválidas");
            // Creo el token de acceso para el usuario logueado
            const token = yield (0, jwt_1.createAccessToken)({
                id: userFound._id,
                role: userFound.role,
            });
            // Añadir token en el header como cookie
            /*
            res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token as string, {
                    //httpOnly: true,
                    //secure: process.env.NODE_ENV !== "development",
                    //sameSite: "strict",
                    maxAge: 60 * 60 * 24,
                    path: "/",
                })
            );
            */
            //res.setHeader("Authorization", `Bearer ${token as string}`);
            return { token, user: userFound };
        }
        catch (error) {
            throw error;
        }
    });
}
function register(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Encripto la contraseña
            const passwordHashed = yield (0, bcrypt_1.encryptPassword)(user.password);
            // Creo el objeto para un nuevo usuario, con la contraseña encryptada
            const userSaved = yield user_service_1.default.addUser(Object.assign(Object.assign({}, user), { password: passwordHashed }));
            if (!userSaved)
                throw new api_errors_1.BadRequestError("No se pudo registrar el usuario");
            // Creo el token de acceso para el usuario logueado
            const token = yield (0, jwt_1.createAccessToken)({
                id: userSaved._id,
                role: userSaved.role,
            });
            return { token, user: userSaved };
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = { login, register };
