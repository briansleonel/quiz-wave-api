import { NextFunction, Response } from "express";
import { IdParams, TypedRequest } from "../types/request";
import { isValidId } from "../libs/validObjectId";
import { BadRequestError } from "../libs/api.errors";

export function verifyIdParam<T>(
    req: TypedRequest<T, IdParams>,
    _res: Response,
    next: NextFunction
) {
    const { id } = req.params;

    if (!isValidId(id)) {
        throw new BadRequestError(`Id no válido: ${req.path}`);
    }

    next();
}
