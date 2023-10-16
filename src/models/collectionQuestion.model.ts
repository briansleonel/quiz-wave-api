import { PaginateModel, Schema, model } from "mongoose";
import { ICollectionQuestion } from "../types/question";
import paginate from "mongoose-paginate-v2";

const CollectionQuestionSchema = new Schema<ICollectionQuestion>(
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
        description: {
            type: String,
        },
        duration: { type: Number, default: 20 },
    },
    { timestamps: true }
);

// Agrego pligin para tener paginación de consulta de datos
CollectionQuestionSchema.plugin(paginate);

// interfaz representando el esquema como un documento de mongoose
interface CollectionQuestionDocument extends Document, ICollectionQuestion {}

/**
 * Representa un modelo de mongoose para una "Pregunta" de una colección
 */
const CollectionQuestionModel = model<
    CollectionQuestionDocument,
    PaginateModel<CollectionQuestionDocument>
>("CollectionQuestion", CollectionQuestionSchema);

export default CollectionQuestionModel;
