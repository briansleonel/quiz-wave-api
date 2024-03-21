import CollectionModel from "../models/collection.model";
import { ICollectionDTO } from "../types/collection";
import { IPagiginOptions } from "../types/pagination";

async function getById(id: string) {
    return await CollectionModel.findById(id);
}

async function getFilteredQuery(
    query: any,
    recents: number,
    options: IPagiginOptions
) {
    return await CollectionModel.paginate(query, {
        ...options,
        sort: { createdAt: recents }, // Ordenar los datos por más recientes o antiguos
    });
}

async function saveCollection(collection: ICollectionDTO) {
    const newCollection = new CollectionModel(collection);

    return await newCollection.save();
}

async function updateCollection(collection: ICollectionDTO, id: string) {
    return await CollectionModel.findByIdAndUpdate(id, collection, {
        new: true,
    });
}

async function deleteCollection(id: string) {
    return await CollectionModel.findByIdAndDelete(id);
}

export default {
    getById,
    getFilteredQuery,
    deleteCollection,
    saveCollection,
    updateCollection,
};
