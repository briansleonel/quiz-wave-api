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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_errors_1 = require("../libs/api.errors");
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFound = yield user_repository_1.default.getUser(id);
            if (!userFound) {
                throw new api_errors_1.NotFoundError("Usuario no encontrado");
            }
            return userFound;
        }
        catch (error) {
            throw error;
        }
    });
}
function getFilteredUsers(query, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield user_repository_1.default.getFilteredUsers(query, options);
            const { docs, offset, meta, totalDocs } = users, restData = __rest(users, ["docs", "offset", "meta", "totalDocs"]);
            return {
                data: users.docs,
                pagination: Object.assign({ totalData: users.totalDocs }, restData),
                totalDocs,
            };
        }
        catch (error) {
            throw error;
        }
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userSaved = user_repository_1.default.addUser(user);
            if (!userSaved)
                throw new api_errors_1.BadRequestError("No se pudo registrar el usuario");
            return userSaved;
        }
        catch (error) {
            throw error;
        }
    });
}
function updateUser(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFound = yield user_repository_1.default.updateUser(user, id);
            if (!userFound) {
                throw new api_errors_1.BadRequestError("Usuario no encontrado");
            }
            return userFound;
        }
        catch (error) {
            throw error;
        }
    });
}
function changeverifiedUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFound = yield getUser(id);
            if (!userFound)
                throw new api_errors_1.BadRequestError("No se encontró el usuario");
            const userChanged = yield user_repository_1.default.changeverifiedUser(userFound, id);
            if (!userChanged)
                throw new api_errors_1.BadRequestError("No se puedo cambiar el estado");
            return userChanged;
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userDeleted = yield user_repository_1.default.deleteUser(id);
            if (!userDeleted)
                throw new api_errors_1.BadRequestError("No se pudo eliminar el usuario");
            return userDeleted;
        }
        catch (error) {
            throw error;
        }
    });
}
function findUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userFound = yield user_repository_1.default.findUserByUsername(username);
            if (!userFound)
                throw new api_errors_1.BadRequestError("Nombre de usuario no encontrado");
            return userFound;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = {
    getUser,
    addUser,
    changeverifiedUser,
    deleteUser,
    getFilteredUsers,
    updateUser,
    findUserByUsername,
};
