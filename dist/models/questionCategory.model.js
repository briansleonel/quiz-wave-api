"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
/**
 * Permite representar un esquema de mongoose para una determinada "Categoría"
 */
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, lowercase: true, trim: true },
});
// Agrego pligin para tener paginación de consulta de datos
CategorySchema.plugin(mongoose_paginate_v2_1.default);
/**
 * Representa un modelo de mongoose para una "Categoría"
 */
const QuestionCategoryModel = (0, mongoose_1.model)("QuestionCategory", CategorySchema);
exports.default = QuestionCategoryModel;
