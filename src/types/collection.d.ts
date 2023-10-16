import { Types } from "mongoose";
import { ICollectionQuestionWithId } from "./question";
import { IUser } from "./user";

export interface ICollection {
    name: string;
    description: string;
    questions: Array<ICollectionQuestionWithId>;
    user: IUser;
}

export interface ICollectionWithID extends ICollection {
    _id: Types.ObjectId;
}

export interface ICollectionDTO extends Omit<ICollection, "user"> {
    user: string;
}
