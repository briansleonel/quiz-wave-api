import { Schema, model } from "mongoose";
import { IQuestionOptions } from "../interfaces/questionOptions.interface";

const OptionsSchema = new Schema<IQuestionOptions>({
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String, required: true },
});

const QuestionOptionsModel = model("QuestionOption", OptionsSchema);

export default QuestionOptionsModel;
