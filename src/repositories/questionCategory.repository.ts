import QuestionCategoryModel from "../models/questionCategory.model";
import { IPagiginOptions } from "../types/pagination";
import { IQuestionCategory } from "../types/questionCategory";

async function getById(id: string) {
    return await QuestionCategoryModel.findById(id);

    //if (!category) throw new BadRequestError("Categoría no encontrada");

    //return category
}
async function getByQuery(query: any, options: IPagiginOptions) {
    return await QuestionCategoryModel.paginate(query, options);
}
async function saveCategory(category: IQuestionCategory) {
    const newCategory = new QuestionCategoryModel(category);

    return await newCategory.save();
}
async function updateCategory(category: IQuestionCategory, id: string) {
    return await QuestionCategoryModel.findByIdAndUpdate(id, category, {
        new: true, // Indicio que me devuelva el objeto actualizado
    });
}
async function deleteCategory(id: string) {
    return await QuestionCategoryModel.findByIdAndDelete(id);
}

export default {
    getById,
    saveCategory,
    getByQuery,
    deleteCategory,
    updateCategory,
};
