"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorFactory = exports.ForbiddenError = exports.InternalServerError = exports.UnauthorizedError = exports.BadRequestError = exports.NotFoundError = exports.ApiResponseError = void 0;
const http_status_codes_1 = require("http-status-codes");
class ApiResponseError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.ApiResponseError = ApiResponseError;
class NotFoundError extends ApiResponseError {
    constructor(message = "Recurso no encontrado") {
        super(http_status_codes_1.StatusCodes.NOT_FOUND, message);
    }
}
exports.NotFoundError = NotFoundError;
class BadRequestError extends ApiResponseError {
    constructor(message = "Solicitud Incorrecta") {
        super(http_status_codes_1.StatusCodes.BAD_REQUEST, message);
    }
}
exports.BadRequestError = BadRequestError;
class UnauthorizedError extends ApiResponseError {
    constructor(message = "No autorizado") {
        super(http_status_codes_1.StatusCodes.UNAUTHORIZED, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class InternalServerError extends ApiResponseError {
    constructor(message = "Internal Server Error") {
        super(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}
exports.InternalServerError = InternalServerError;
class ForbiddenError extends ApiResponseError {
    constructor(message = "Forbidden") {
        super(http_status_codes_1.StatusCodes.FORBIDDEN, message);
    }
}
exports.ForbiddenError = ForbiddenError;
class ApiErrorFactory {
    static createNotFoundError(message) {
        return new NotFoundError(message);
    }
    static createBadRequestError(message) {
        return new BadRequestError(message);
    }
    static createUnathorizedError(message) {
        return new UnauthorizedError(message);
    }
    static createInternalServerError(message) {
        return new InternalServerError(message);
    }
}
exports.ApiErrorFactory = ApiErrorFactory;
