import { Schema, model } from "mongoose";
import { IQuestionCategory } from "../interfaces/questionCategory.interface";

const CategorySchema = new Schema<IQuestionCategory>({
    name: { type: String, required: true, lowercase: true, trim: true },
});

const QuestionCategoryModel = model("QuestionCategory", CategorySchema);

export default QuestionCategoryModel;
