import { NextFunction, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { apiResponse } from "../libs/response.handle";
import { StatusCodes } from "http-status-codes";
import { IdParams, TypedRequest } from "../types/request";

export const validateSchema =
    <T>(schema: AnyZodObject) =>
    (req: TypedRequest<T, IdParams>, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError)
                return apiResponse(res, {
                    status: StatusCodes.BAD_REQUEST,
                    message: error.errors.map((e) => e.message),
                });

            return apiResponse(res, {
                status: StatusCodes.BAD_REQUEST,
                message: error as string,
            });
        }
    };
