import { BadRequestError } from "../libs/api.errors";
import questionCategoryRepository from "../repositories/questionCategory.repository";
import { IPagiginOptions } from "../types/pagination";
import { IQuestionCategory } from "../types/questionCategory";

async function getById(id: string) {
    try {
        const categoryFound = await questionCategoryRepository.getById(id);

        if (!categoryFound)
            throw new BadRequestError("Categoría no encontrada");

        return categoryFound;
    } catch (error) {
        throw error;
    }
}
async function getByQuery(query: any, options: IPagiginOptions) {
    try {
        const collections = await questionCategoryRepository.getByQuery(
            query,
            options
        );

        const { docs, offset, meta, totalDocs, ...restData } = collections;

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
async function saveCategory(category: IQuestionCategory) {
    try {
        const categorySaved = await questionCategoryRepository.saveCategory(
            category
        );

        if (!categorySaved)
            throw new BadRequestError("No se puedo guardar la categoría");

        return categorySaved;
    } catch (error) {
        throw error;
    }
}
async function updateCategory(category: IQuestionCategory, id: string) {
    try {
        const categoryUpdated = await questionCategoryRepository.updateCategory(
            category,
            id
        );

        if (!categoryUpdated)
            throw new BadRequestError("No se pudo actualizar la categoría");

        return categoryUpdated;
    } catch (error) {
        throw error;
    }
}
async function deleteCategory(id: string) {
    try {
        const categoryDeleted = await questionCategoryRepository.deleteCategory(
            id
        );

        if (!categoryDeleted)
            throw new BadRequestError("No se pudo eliminar la categoría");

        return categoryDeleted;
    } catch (error) {
        throw error;
    }
}

export default {
    getById,
    saveCategory,
    getByQuery,
    deleteCategory,
    updateCategory,
};
