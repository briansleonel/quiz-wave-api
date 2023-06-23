import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodError } from "zod";
import { apiResponse } from "../libs/response.handle";
import { StatusCodes } from "http-status-codes";

export const validateSchema =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
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
