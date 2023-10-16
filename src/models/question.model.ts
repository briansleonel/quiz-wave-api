import { PaginateModel, Schema, model } from "mongoose";
import { IQuestion } from "../types/question";
import QuestionCategoryModel from "./questionCategory.model";
import UserModel from "./user.model";
import paginate from "mongoose-paginate-v2";

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
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: UserModel,
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
    },
    { timestamps: true }
);

// Agrego pligin para tener paginación de consulta de datos
QuestionSchema.plugin(paginate);

// interfaz representando el esquema como un documento de mongoose
interface QuestionDocument extends Document, IQuestion {}

/**
 * Representa un modelo de mongoose para una "Pregunta"
 */
const QuestionModel = model<QuestionDocument, PaginateModel<QuestionDocument>>(
    "Question",
    QuestionSchema
);

export default QuestionModel;
