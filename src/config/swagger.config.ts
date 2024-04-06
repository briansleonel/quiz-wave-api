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
    customCssUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui.min.css",
    customJs: [
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui-bundle.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui-standalone-preset.min.js",
    ],
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
