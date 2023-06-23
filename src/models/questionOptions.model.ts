import { Schema, model } from "mongoose";
import { IQuestionOptions } from "../interfaces/questionOptions.interface";

/**
 * Permite representar un esquema de mongoose para las "Opciones" de una determinada Pregunta
 */
const OptionsSchema = new Schema<IQuestionOptions>({
    a: { type: String, required: true },
    b: { type: String, required: true },
    c: { type: String, required: true },
    d: { type: String, required: true },
});

/**
 * Permite representar un esquema de mongoose para las "Opciones" de una Pregunta
 */
const QuestionOptionsModel = model("QuestionOption", OptionsSchema);

export default QuestionOptionsModel;
