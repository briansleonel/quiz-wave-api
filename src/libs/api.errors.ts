import { StatusCodes } from "http-status-codes";

export class ApiResponseError extends Error {
    statusCode: number;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
    }
}

export class NotFoundError extends ApiResponseError {
    constructor(message: string = "Recurso no encontrado") {
        super(StatusCodes.NOT_FOUND, message);
    }
}

export class BadRequestError extends ApiResponseError {
    constructor(message: string = "Solicitud Incorrecta") {
        super(StatusCodes.BAD_REQUEST, message);
    }
}

export class UnauthorizedError extends ApiResponseError {
    constructor(message: string = "No autorizado") {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}

export class InternalServerError extends ApiResponseError {
    constructor(message: string = "Internal Server Error") {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}

export class ForbiddenError extends ApiResponseError {
    constructor(message: string = "Forbidden") {
        super(StatusCodes.FORBIDDEN, message);
    }
}

export class ApiErrorFactory {
    static createNotFoundError(message: string): NotFoundError {
        return new NotFoundError(message);
    }

    static createBadRequestError(message: string): BadRequestError {
        return new BadRequestError(message);
    }

    static createUnathorizedError(message: string): UnauthorizedError {
        return new UnauthorizedError(message);
    }

    static createInternalServerError(message: string): InternalServerError {
        return new InternalServerError(message);
    }
}
