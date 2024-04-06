"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_model_1 = __importDefault(require("./user.model"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const collectionQuestion_model_1 = __importDefault(require("./collectionQuestion.model"));
const CollectionSchema = new mongoose_1.Schema({
    name: { type: String, required: [true, "El nombre es requerido"] },
    description: { type: String },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: user_model_1.default,
        required: [true, "El usuario es requerido"],
    },
    questions: [
        {
            type: collectionQuestion_model_1.default.schema,
            required: [true, "Debe agregar preguntas a la colección"],
        },
    ],
}, { timestamps: true });
// Agrego pligin para tener paginación de consulta de datos
CollectionSchema.plugin(mongoose_paginate_v2_1.default);
/**
 * Representa un modelo de mongoose para una "Colección"
 */
const CollectionModel = (0, mongoose_1.model)("Collection", CollectionSchema);
exports.default = CollectionModel;
