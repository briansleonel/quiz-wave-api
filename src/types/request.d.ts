import { Request } from "express";

export interface TypedRequest<BODY, PARAMS> extends Request {
    body: BODY;
    params: PARAMS;
}

export interface TypedRequestBody<T> {
    body: T;
};

export interface TypedRequestParams<T> {
    params: T;
};

export interface IdParams {
    id: string;
}
