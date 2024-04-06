"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const CollectionQuestionSchema = new mongoose_1.Schema({
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
    description: {
        type: String,
    },
    duration: { type: Number, default: 20 },
}, { timestamps: false, _id: false });
// Agrego pligin para tener paginación de consulta de datos
CollectionQuestionSchema.plugin(mongoose_paginate_v2_1.default);
/**
 * Representa un modelo de mongoose para una "Pregunta" de una colección
 */
const CollectionQuestionModel = (0, mongoose_1.model)("CollectionQuestion", CollectionQuestionSchema);
exports.default = CollectionQuestionModel;
