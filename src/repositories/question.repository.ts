import { BadRequestError } from "../libs/api.errors";
import QuestionModel from "../models/question.model";
import { IPagiginOptions } from "../types/pagination";
import { IQuestionDTO } from "../types/question";

async function getById(id: string) {
    return await QuestionModel.findById(id).populate("category");
}

async function getByQuery(
    query: any,
    options: IPagiginOptions,
    recents: number
) {
    return await QuestionModel.paginate(query, {
        ...options,
        populate: [{ path: "category" }],
        sort: { createdAt: recents },
    });
}

async function saveQuestion(question: IQuestionDTO) {
    const newQuestion = new QuestionModel(question);

    return await newQuestion.save();
}

async function updateQuestion(question: IQuestionDTO, id: string) {
    return await QuestionModel.findByIdAndUpdate(id, question, { new: true });
}

async function deleteQuestion(id: string) {
    return await QuestionModel.findByIdAndDelete(id);
}

async function changeVerified(id: string) {
    const questionFound = await getById(id);

    if (!questionFound) throw new BadRequestError("No se encontró la pregunta");

    return await QuestionModel.findByIdAndUpdate(
        id,
        {
            verified: !questionFound.verified,
        },
        { new: true }
    );
}

export default {
    getById,
    saveQuestion,
    getByQuery,
    deleteQuestion,
    updateQuestion,
    changeVerified,
};
