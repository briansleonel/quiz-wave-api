import { Types } from "mongoose";
import { IQuestionOptions } from "./questionOptions.interface";

export interface IQuestion {
    question: string;
    options: IQuestionOptions;
    correct: string;
    category: Types.ObjectId | string;
    user: Types.ObjectId | string;
    verified: boolean;
    description: string;
}
