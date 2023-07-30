import { Types } from "mongoose";

export interface IQuestion {
    question: string;
    //options: IQuestionOptions;
    options: Array<string>;
    //correct: string;
    correct: number;
    category: Types.ObjectId | string;
    user: Types.ObjectId | string;
    verified: boolean;
    description: string;
}
