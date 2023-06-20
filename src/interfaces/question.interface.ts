import { IQuestionCategory } from "./questionCategory.interface";
import { IQuestionOptions } from "./questionOptions.interface";

export interface IQuestion {
    question: string;
    options: IQuestionOptions;
    correct: string;
    category: IQuestionCategory;
    userId: string;
    verified: boolean;
    description: string;
}
