import { Types } from "mongoose";
import { IQuestionCategoryId } from "./questionCategory";

export interface IQuestion {
    question: string;
    //options: IQuestionOptions;
    options: Array<string>;
    //correct: string;
    correct: number;
    //category: Types.ObjectId | string | IQuestionCategory;
    category: IQuestionCategoryId;
    user: Types.ObjectId | string;
    verified: boolean;
    description: string;
}

export interface IQuestionId extends IQuestion {
    _id: Types.ObjectId;
}
