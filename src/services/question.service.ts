import { BadRequestError } from "../libs/api.errors";
import questionRepository from "../repositories/question.repository";
import { IPagiginOptions } from "../types/pagination";
import { IQuestionDTO } from "../types/question";

async function getById(id: string) {
    try {
        const question = await questionRepository.getById(id);

        if (!question) throw new BadRequestError("Pregunta no encontrada");

        return question;
    } catch (error) {
        throw error;
    }
}

async function getByQuery(
    query: any,
    options: IPagiginOptions,
    recents: number
) {
    try {
        const questions = await questionRepository.getByQuery(
            query,
            options,
            recents
        );

        const { docs, offset, meta, totalDocs, ...restData } = questions;

        return {
            data: docs,
            pagination: {
                totalData: totalDocs,
                ...restData,
            },
        };
    } catch (error) {
        throw error;
    }
}

async function saveQuestion(question: IQuestionDTO) {
    try {
        const questionSaved = await questionRepository.saveQuestion(question);

        if (!questionSaved)
            throw new BadRequestError("No se pudo guardar la pregunta");

        return questionSaved;
    } catch (error) {
        throw error;
    }
}

async function updateQuestion(question: IQuestionDTO, id: string) {
    try {
        const questionUpdated = await questionRepository.updateQuestion(
            question,
            id
        );

        if (!questionUpdated)
            throw new BadRequestError("No se pudo actualizar la pregunta");

        return questionUpdated;
    } catch (error) {
        throw error;
    }
}

async function deleteQuestion(id: string) {
    try {
        const questionDeleted = await questionRepository.deleteQuestion(id);

        if (!questionDeleted)
            throw new BadRequestError("No se pudo eliminar la pregunta");

        return questionDeleted;
    } catch (error) {
        throw error;
    }
}

async function changeVerified(id: string) {
    try {
        const questionVerified = questionRepository.changeVerified(id);

        if (!questionVerified)
            throw new BadRequestError(
                "No se pudo cambiar la verificación de pregunta"
            );

        return questionVerified;
    } catch (error) {
        throw error;
    }
}

export default {
    getById,
    saveQuestion,
    getByQuery,
    deleteQuestion,
    updateQuestion,
    changeVerified,
};
