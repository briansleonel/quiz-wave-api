import { PaginateModel, Schema, model } from "mongoose";
import { ICollection } from "../types/collection";
import UserModel from "./user.model";
import paginate from "mongoose-paginate-v2";
import CollectionQuestionModel from "./collectionQuestion.model";

const CollectionSchema = new Schema<ICollection>(
    {
        name: { type: String, required: [true, "El nombre es requerido"] },
        description: { type: String },
        user: {
            type: Schema.Types.ObjectId,
            ref: UserModel,
            required: [true, "El usuario es requerido"],
        },
        questions: [
            {
                type: CollectionQuestionModel.schema,
                required: [true, "Debe agregar preguntas a la colección"],
            },
        ],
    },
    { timestamps: true }
);

// Agrego pligin para tener paginación de consulta de datos
CollectionSchema.plugin(paginate);

// interfaz representando el esquema como un documento de mongoose
interface CollectionDocument extends Document, ICollection {}

/**
 * Representa un modelo de mongoose para una "Colección"
 */
const CollectionModel = model<
    CollectionDocument,
    PaginateModel<CollectionDocument>
>("Collection", CollectionSchema);

export default CollectionModel;
