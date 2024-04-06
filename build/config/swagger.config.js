"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.swaggerOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
exports.swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Endpoints docs for Quiz-Wave",
            version: "1.0.0",
            description: "API Quiz Wave",
        },
    },
    apis: ["./src/routes/*.route.ts"],
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui.min.css",
    customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui-standalone-preset.min.js",
    ],
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(exports.swaggerOptions);
