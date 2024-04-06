import swaggerJSDoc, { Options } from "swagger-jsdoc";

export const swaggerOptions: Options = {
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

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
