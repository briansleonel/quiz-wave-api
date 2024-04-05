"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_errors_1 = require("../libs/api.errors");
const validObjectId_1 = require("../libs/validObjectId");
const collection_repository_1 = __importDefault(require("../repositories/collection.repository"));
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collection = yield collection_repository_1.default.getById(id);
            if (!collection)
                throw new api_errors_1.NotFoundError("Colección no encontrada");
            return collection;
        }
        catch (error) {
            throw error;
        }
    });
}
function getFilteredQuery(query, recents, options) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collections = yield collection_repository_1.default.getFilteredQuery(query, recents, options);
            const { docs, offset, meta, totalDocs } = collections, restData = __rest(collections, ["docs", "offset", "meta", "totalDocs"]);
            return {
                data: docs,
                pagination: Object.assign({ totalData: totalDocs }, restData),
            };
        }
        catch (error) {
            throw error;
        }
    });
}
function saveCollection(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collectionSaved = yield collection_repository_1.default.saveCollection(collection);
            if (!collectionSaved)
                throw new api_errors_1.BadRequestError("No se pudo guardar la colección");
            return collectionSaved;
        }
        catch (error) {
            throw error;
        }
    });
}
function updateCollection(collection, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (collection.user && !(0, validObjectId_1.isValidId)(collection.user))
                throw new api_errors_1.BadRequestError("Id del usuario inválido");
            const collectionUpdated = yield collection_repository_1.default.updateCollection(collection, id);
            if (!collectionUpdated)
                throw new api_errors_1.BadRequestError("No se pudo actualizar la colección");
            return collectionUpdated;
        }
        catch (error) {
            throw error;
        }
    });
}
function deleteCollection(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collectionDeleted = yield collection_repository_1.default.deleteCollection(id);
            if (!collectionDeleted)
                throw new api_errors_1.BadRequestError("No se pudo eliminar la colección");
            return collectionDeleted;
        }
        catch (error) {
            throw error;
        }
    });
}
exports.default = {
    getById,
    getFilteredQuery,
    deleteCollection,
    saveCollection,
    updateCollection,
};
