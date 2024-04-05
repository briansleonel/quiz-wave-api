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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const api_errors_1 = require("../libs/api.errors");
const collection_model_1 = __importDefault(require("../models/collection.model"));
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield collection_model_1.default.findById(id);
    });
}
function getFilteredQuery(query, recents, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield collection_model_1.default.paginate(query, Object.assign(Object.assign({}, options), { sort: { createdAt: recents } }));
    });
}
function saveCollection(collection) {
    return __awaiter(this, void 0, void 0, function* () {
        const newCollection = new collection_model_1.default(collection);
        return yield newCollection.save();
    });
}
function updateCollection(collection, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const collectionUpdated = yield collection_model_1.default.findByIdAndUpdate(id, collection, {
                new: true,
            });
            return collectionUpdated;
        }
        catch (error) {
            if (error instanceof Error)
                throw new api_errors_1.BadRequestError(error.message);
            throw error;
        }
    });
}
function deleteCollection(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield collection_model_1.default.findByIdAndDelete(id);
    });
}
exports.default = {
    getById,
    getFilteredQuery,
    deleteCollection,
    saveCollection,
    updateCollection,
};
