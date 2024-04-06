"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIdParam = void 0;
const validObjectId_1 = require("../libs/validObjectId");
const api_errors_1 = require("../libs/api.errors");
function verifyIdParam(req, _res, next) {
    const { id } = req.params;
    if (!(0, validObjectId_1.isValidId)(id)) {
        throw new api_errors_1.BadRequestError(`Id no válido: ${req.path}`);
    }
    next();
}
exports.verifyIdParam = verifyIdParam;
