import { Types } from "mongoose";
import { IQuestionCategoryWithId } from "./questionCategory";

export interface ICollectionQuestion {
    question: string;
    options: Array<string>;
    correct: number;
    description: string;
    duration: number;
}

export interface ICollectionQuestionWithId {
    _id: Types.ObjectId;
}

interface IQuestion extends Omit<ICollectionQuestion, "duration"> {
    category: IQuestionCategoryWithId;
    user: Types.ObjectId | string;
    verified: boolean;
}

interface IQuestionDTO extends Omit<IQuestion, "category" | "user"> {
    category: string;
    user: string;
}

export interface IQuestionWithId extends IQuestion {
    _id: Types.ObjectId;
}
