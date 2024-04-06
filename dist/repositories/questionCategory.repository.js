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
const questionCategory_model_1 = __importDefault(require("../models/questionCategory.model"));
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield questionCategory_model_1.default.findById(id);
    });
}
function getByQuery(query, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield questionCategory_model_1.default.paginate(query, options);
    });
}
function saveCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCategory = new questionCategory_model_1.default(category);
        return yield newCategory.save();
    });
}
function updateCategory(category, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield questionCategory_model_1.default.findByIdAndUpdate(id, category, {
            new: true, // Indicio que me devuelva el objeto actualizado
        });
    });
}
function deleteCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield questionCategory_model_1.default.findByIdAndDelete(id);
    });
}
exports.default = {
    getById,
    saveCategory,
    getByQuery,
    deleteCategory,
    updateCategory,
};
