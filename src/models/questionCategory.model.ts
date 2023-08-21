import mongoose, { Schema, model, PaginateModel } from "mongoose";
import { IQuestionCategory } from "../types/questionCategory";
import paginate from "mongoose-paginate-v2";

/**
 * Permite representar un esquema de mongoose para una determinada "Categoría"
 */
const CategorySchema = new Schema<IQuestionCategory>({
    name: { type: String, required: true, lowercase: true, trim: true },
});

// Agrego pligin para tener paginación de consulta de datos
CategorySchema.plugin(paginate);

// interfaz representando el esquema como un documento de mongoose
interface CategoryDocument extends mongoose.Document, IQuestionCategory {}

/**
 * Representa un modelo de mongoose para una "Categoría"
 */
const QuestionCategoryModel = model<
    CategoryDocument,
    PaginateModel<CategoryDocument>
>("QuestionCategory", CategorySchema);

export default QuestionCategoryModel;
