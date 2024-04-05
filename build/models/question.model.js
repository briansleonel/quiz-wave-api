"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const questionCategory_model_1 = __importDefault(require("./questionCategory.model"));
const user_model_1 = __importDefault(require("./user.model"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
/**
 * Permite representar un esquema de mongoose para una determinada "Pregunta"
 */
const QuestionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: [true, "La pregunta es requerida"],
    },
    options: [
        {
            type: String,
            required: [true, "Las opciones son requeridas"],
        },
    ],
    correct: {
        type: Number,
        required: [true, "La respuesta correcta es requerida"],
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: questionCategory_model_1.default,
        required: [true, "La categoría es requerida"],
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.default,
        required: [true, "El usuario es requerido"],
        //select: false,
    },
    description: {
        type: String,
        //required: [true, "La descripción es requerida"],
    },
    verified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
// Agrego pligin para tener paginación de consulta de datos
QuestionSchema.plugin(mongoose_paginate_v2_1.default);
/**
 * Representa un modelo de mongoose para una "Pregunta"
 */
const QuestionModel = (0, mongoose_1.model)("Question", QuestionSchema);
exports.default = QuestionModel;
