import { Response } from "express";
import { APIResponse } from "../types/response";

/**
 * Permite devolver una serie de datos pasados como parametros en apiRes, hacia el cliente
 * Informa el estado de la petición
 *
 * @param res response de la petición
 * @param apiRes datos que serán enviados como respuesta de la petición
 */
export function apiResponse<I>(res: Response, apiRes: APIResponse<I>) {
    res.status(apiRes.status).json(apiRes);
}
