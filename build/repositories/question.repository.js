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
const question_model_1 = __importDefault(require("../models/question.model"));
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield question_model_1.default.findById(id).populate("category");
    });
}
function getByQuery(query, options, recents) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield question_model_1.default.paginate(query, Object.assign(Object.assign({}, options), { populate: [{ path: "category" }], sort: { createdAt: recents } }));
    });
}
function saveQuestion(question) {
    return __awaiter(this, void 0, void 0, function* () {
        const newQuestion = new question_model_1.default(question);
        return yield newQuestion.save();
    });
}
function updateQuestion(question, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield question_model_1.default.findByIdAndUpdate(id, question, { new: true });
    });
}
function deleteQuestion(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield question_model_1.default.findByIdAndDelete(id);
    });
}
function changeVerified(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const questionFound = yield getById(id);
        if (!questionFound)
            throw new api_errors_1.BadRequestError("No se encontró la pregunta");
        return yield question_model_1.default.findByIdAndUpdate(id, {
            verified: !questionFound.verified,
        }, { new: true });
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
