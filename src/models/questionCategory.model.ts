import { Schema, model } from "mongoose";
import { IQuestionCategory } from "../interfaces/questionCategory.interface";

/**
 * Permite representar un esquema de mongoose para una determinada "Categoría"
 */
const CategorySchema = new Schema<IQuestionCategory>({
    name: { type: String, required: true, lowercase: true, trim: true },
});

/**
 * Representa un modelo de mongoose para una "Categoría"
 */
const QuestionCategoryModel = model("QuestionCategory", CategorySchema);

export default QuestionCategoryModel;
