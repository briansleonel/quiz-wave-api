import { Schema, model } from "mongoose";
import { IQuestion } from "../interfaces/question.interface";
import QuestionCategoryModel from "./questionCategory.model";
import UserModel from "./user.model";

/**
 * Permite representar un esquema de mongoose para una determinada "Pregunta"
 */
const QuestionSchema = new Schema<IQuestion>(
    {
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
            type: Schema.Types.ObjectId,
            ref: QuestionCategoryModel,
            required: [true, "La categoría es requerida"],
            select: false,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: UserModel,
            required: [true, "El usuario es requerido"],
            select: false,
        },
        description: {
            type: String,
            //required: [true, "La descripción es requerida"],
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

/**
 * Representa un modelo de mongoose para una "Pregunta"
 */
const QuestionModel = model("Question", QuestionSchema);

export default QuestionModel;
