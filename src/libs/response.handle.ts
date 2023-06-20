import { Response } from "express";
import { APIResponse } from "../types/response";

export function apiResponse<I>(res: Response, apiRes: APIResponse<I>) {
    res.status(apiRes.status);
    res.send(apiRes);
}
