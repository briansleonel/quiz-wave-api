"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionSchema = void 0;
const zod_1 = require("zod");
const validObjectId_1 = require("../libs/validObjectId");
exports.questionSchema = zod_1.z.object({
    question: zod_1.z
        .string({ required_error: "La pregunta es requerida" })
        .nonempty({ message: "La pregunta no puede estar vacía" }),
    options: zod_1.z.array(zod_1.z.string(), {
        required_error: "Las opciones son requeridas",
    }),
    correct: zod_1.z.number({ required_error: "La respuesta correcta es requerida" }),
    category: zod_1.z
        .string({ required_error: "La categoría es requerida" })
        .refine(validObjectId_1.isValidId, { message: "Identificador de categoría no válido" }),
    user: zod_1.z
        .string({ required_error: "El usuario es requerido" })
        .refine(validObjectId_1.isValidId, { message: "Identificador de usuario no válido" })
        .optional(),
    verified: zod_1.z.boolean().optional(),
    description: zod_1.z
        .string({ required_error: "La descripción es requerida" })
        .optional(),
});
/*
    category: z.object(
        {
            _id: z.string(),
            //.refine(isValidId, {message: "Identificador de categoría no válido"}),
            name: z.string(),
        },
        { required_error: "La categoría es requerida" }
    )
*/
