import { Request } from "express";
import { Types } from "mongoose";
import { Role } from "../libs/role.enum";
import { IUserRequest } from "../interfaces/user.interface";

/**
 * Representa una Petición (Request) con un tipo de body y params tipados
 */
export interface TypedRequest<BODY, PARAMS> extends Request {
    body: BODY;
    params: PARAMS;
}

export interface TypedRequestBody<T> extends Request {
    body: T;
}

export interface TypedRequestParams<T> extends Request {
    params: T;
}

/**
 * Representa los params recibidos en el path de una request
 */
export interface IdParams {
    id: string;
}
