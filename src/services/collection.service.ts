import { BadRequestError } from "../libs/api.errors";
import { isValidId } from "../libs/validObjectId";
import collectionRepository from "../repositories/collection.repository";
import { ICollectionDTO } from "../types/collection";
import { IPagiginOptions } from "../types/pagination";

async function getById(id: string) {
    try {
        const collection = await collectionRepository.getById(id);

        if (!collection) throw new BadRequestError("Colección no encontrada");

        return collection;
    } catch (error) {
        throw error;
    }
}

async function getFilteredQuery(
    query: any,
    recents: number,
    options: IPagiginOptions
) {
    try {
        const collections = await collectionRepository.getFilteredQuery(
            query,
            recents,
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

async function saveCollection(collection: ICollectionDTO) {
    try {
        if (!isValidId(collection.user))
            throw new BadRequestError("Id del usuario inválido");

        const collectionSaved = await collectionRepository.saveCollection(
            collection
        );

        if (!collectionSaved)
            throw new BadRequestError("No se pudo guardar la colección");

        return collectionSaved;
    } catch (error) {
        throw error;
    }
}

async function updateCollection(collection: ICollectionDTO, id: string) {
    try {
        if (!isValidId(collection.user))
            throw new BadRequestError("Id del usuario inválido");

        const collectionUpdated = await collectionRepository.updateCollection(
            collection,
            id
        );

        if (!collectionUpdated)
            throw new BadRequestError("No se pudo actualizar la colección");

        return collectionUpdated;
    } catch (error) {
        throw error;
    }
}

async function deleteCollection(id: string) {
    try {
        const collectionDeleted = await collectionRepository.deleteCollection(
            id
        );

        if (!collectionDeleted)
            throw new BadRequestError("No se pudo eliminar la colección");

        return collectionDeleted;
    } catch (error) {
        throw error;
    }
}

export default {
    getById,
    getFilteredQuery,
    deleteCollection,
    saveCollection,
    updateCollection,
};
