import { Types } from "mongoose";

export interface IQuestionCategory {
    name: string;
}

export interface IQuestionCategoryId extends IQuestionCategory {
    _id: Types.ObjectId;
}
