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
const user_model_1 = __importDefault(require("../models/user.model"));
function getUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findById(id);
    });
}
function getFilteredUsers(query, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // Busco los datos y los pagino
        return yield user_model_1.default.paginate(query, options);
    });
}
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = new user_model_1.default(user);
            return yield newUser.save();
        }
        catch (error) {
            if (error instanceof Error) {
                const errDuplicateKey = error.message.split(" ")[0];
                if (errDuplicateKey === "E11000")
                    if (error.message.includes("username"))
                        throw new api_errors_1.BadRequestError("Nombre de usuario no disponible");
                    else if (error.message.includes("email"))
                        throw new api_errors_1.BadRequestError("Este email ya está en uso");
                    else
                        throw new api_errors_1.BadRequestError("Claves duplicadas");
            }
            throw error;
        }
    });
}
function updateUser(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const userFound = yield user_model_1.default.findByIdAndUpdate(id, user, {
            new: true,
        });
        return userFound;
    });
}
function changeverifiedUser(user, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findByIdAndUpdate(id, { verified: !user.verified }, {
            new: true,
        });
    });
}
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findByIdAndDelete(id);
    });
}
function findUserByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.default.findOne({ username });
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
