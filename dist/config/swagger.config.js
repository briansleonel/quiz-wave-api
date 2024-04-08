"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = exports.swaggerCustom = exports.swaggerOptions = void 0;
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
};
exports.swaggerCustom = {
    customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui.min.css",
    customJs: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui-bundle.js",
    customFavIcon: "https://avatars.githubusercontent.com/u/13707038?s=200&v=4",
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(exports.swaggerOptions);
