"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionSchema = void 0;
const zod_1 = require("zod");
const validObjectId_1 = require("../libs/validObjectId");
exports.collectionSchema = zod_1.z.object({
    name: zod_1.z
        .string({
        required_error: "El nombre de la colección es requerido",
        invalid_type_error: "El nombre debe ser un texto",
    })
        .nonempty({ message: "El nombre no puede estar vacío" }),
    description: zod_1.z
        .string({ invalid_type_error: "La descripción debe ser un texto" })
        .optional(),
    user: zod_1.z
        .string({
        required_error: "El ID de usuario es requerido",
        invalid_type_error: "El usuario debe ser un texto",
    })
        .refine(validObjectId_1.isValidId, { message: "ID de usuario no válido" })
        .optional(),
    questions: zod_1.z
        .array(zod_1.z.object({
        question: zod_1.z
            .string({ required_error: "La pregunta es requerida" })
            .nonempty({ message: "La pregunta no puede estar vacía" }),
        options: zod_1.z
            .array(zod_1.z.string(), {
            required_error: "Las opciones son requeridas",
        })
            .nonempty({
            message: "Debe ingresar opciones en la pregunta",
        })
            .min(2, {
            message: "Debe ingresar al menos 2 opciones en cada pregunta",
        }),
        correct: zod_1.z.number({
            required_error: "La respuesta correcta es requerida",
            invalid_type_error: "La respuesta correcta debe ser un número",
        }),
        duration: zod_1.z
            .number({
            invalid_type_error: "La duración debe ser un número",
        })
            .min(10, {
            message: "La duración debe ser mayor o igual a 10",
        })
            .optional(),
        description: zod_1.z.string().optional(),
    }), { required_error: "Las preguntas son requeridas" })
        .nonempty({ message: "Debe ingresar al menos 1 pregunta" }),
});
