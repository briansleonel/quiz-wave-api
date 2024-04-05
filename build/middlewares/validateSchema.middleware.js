"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = void 0;
const zod_1 = require("zod");
const response_handle_1 = require("../libs/response.handle");
const http_status_codes_1 = require("http-status-codes");
const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError)
            return (0, response_handle_1.apiResponse)(res, {
                status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                message: error.errors.map((e) => e.message),
            });
        return (0, response_handle_1.apiResponse)(res, {
            status: http_status_codes_1.StatusCodes.BAD_REQUEST,
            message: error,
        });
    }
};
exports.validateSchema = validateSchema;
