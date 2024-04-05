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
const question_repository_1 = __importDefault(require("../repositories/question.repository"));
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const question = yield question_repository_1.default.getById(id);
            if (!question)
                throw new api_errors_1.NotFoundError("Pregunta no encontrada");
            return question;
        }
        catch (error) {
            throw error;
        }
    });
}
function getByQuery(query, options, recents) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questions = yield question_repository_1.default.getByQuery(query, options, recents);
            const { docs, offset, meta, totalDocs } = questions, restData = __rest(questions, ["docs", "offset", "meta", "totalDocs"]);
            return {
                data: docs,
                pagination: Object.assign({ totalData: totalDocs }, restData),
            };
        }
        catch (error) {
            throw error;
        }
    });
}
function saveQuestion(question) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questionSaved = yield question_repository_1.default.saveQuestion(question);
            if (!questionSaved)
                throw new api_errors_1.BadRequestError("No se pudo guardar la pregunta");
            return questionSaved;
        }
        catch (error) {
            throw error;
        }
    });
}
function updateQuestion(question, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questionUpdated = yield question_repository_1.default.updateQuestion(question, id);
            if (!questionUpdated)
                throw new api_errors_1.BadRequestError("No se pudo actualizar la pregunta");
            return questionUpdated;
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteQuestion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questionDeleted = yield question_repository_1.default.deleteQuestion(id);
            if (!questionDeleted)
                throw new api_errors_1.BadRequestError("No se pudo eliminar la pregunta");
            return questionDeleted;
        }
        catch (error) {
            throw error;
        }
    });
}
function changeVerified(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const questionVerified = question_repository_1.default.changeVerified(id);
            if (!questionVerified)
                throw new api_errors_1.BadRequestError("No se pudo cambiar la verificación de pregunta");
            return questionVerified;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = {
    getById,
    saveQuestion,
    getByQuery,
    deleteQuestion,
    updateQuestion,
    changeVerified,
};
