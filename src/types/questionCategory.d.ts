import { Types } from "mongoose";

export interface IQuestionCategory {
    name: string;
}

export interface IQuestionCategoryWithId extends IQuestionCategory {
    _id: Types.ObjectId;
}
