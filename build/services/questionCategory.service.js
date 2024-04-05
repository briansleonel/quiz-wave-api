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
const questionCategory_repository_1 = __importDefault(require("../repositories/questionCategory.repository"));
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryFound = yield questionCategory_repository_1.default.getById(id);
            if (!categoryFound)
                throw new api_errors_1.NotFoundError("Categoría no encontrada");
            return categoryFound;
        }
        catch (error) {
            throw error;
        }
    });
}
function getByQuery(query, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collections = yield questionCategory_repository_1.default.getByQuery(query, options);
            const { docs, offset, meta, totalDocs } = collections, restData = __rest(collections, ["docs", "offset", "meta", "totalDocs"]);
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
function saveCategory(category) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categorySaved = yield questionCategory_repository_1.default.saveCategory(category);
            if (!categorySaved)
                throw new api_errors_1.BadRequestError("No se puedo guardar la categoría");
            return categorySaved;
        }
        catch (error) {
            throw error;
        }
    });
}
function updateCategory(category, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryUpdated = yield questionCategory_repository_1.default.updateCategory(category, id);
            if (!categoryUpdated)
                throw new api_errors_1.BadRequestError("No se pudo actualizar la categoría");
            return categoryUpdated;
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteCategory(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categoryDeleted = yield questionCategory_repository_1.default.deleteCategory(id);
            if (!categoryDeleted)
                throw new api_errors_1.BadRequestError("No se pudo eliminar la categoría");
            return categoryDeleted;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = {
    getById,
    saveCategory,
    getByQuery,
    deleteCategory,
    updateCategory,
};
