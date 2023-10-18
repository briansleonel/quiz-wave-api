import { z } from "zod";
import { isValidId } from "../libs/validObjectId";

export const collectionSchema = z.object({
    name: z
        .string({
            required_error: "El nombre de la colección es requerido",
            invalid_type_error: "El nombre debe ser un texto",
        })
        .nonempty({ message: "El nombre no puede estar vacío" }),
    description: z
        .string({ invalid_type_error: "La descripción debe ser un texto" })
        .optional(),
    user: z
        .string({
            required_error: "El ID de usuario es requerido",
            invalid_type_error: "El usuario debe ser un texto",
        })
        .refine(isValidId, { message: "ID de usuario no válido" }),
    questions: z
        .array(
            z.object({
                question: z
                    .string({ required_error: "La pregunta es requerida" })
                    .nonempty({ message: "La pregunta no puede estar vacía" }),
                options: z
                    .array(z.string(), {
                        required_error: "Las opciones son requeridas",
                    })
                    .nonempty({
                        message: "Debe ingresar opciones en la pregunta",
                    })
                    .min(2, {
                        message:
                            "Debe ingresar al menos 2 opciones en cada pregunta",
                    }),
                correct: z.number({
                    required_error: "La respuesta correcta es requerida",
                    invalid_type_error:
                        "La respuesta correcta debe ser un número",
                }),
                duration: z
                    .number({
                        invalid_type_error: "La duración debe ser un número",
                    })
                    .min(10, {
                        message: "La duración debe ser mayor o igual a 10",
                    })
                    .optional(),
                description: z.string().optional(),
            }),
            { required_error: "Las preguntas son requeridas" }
        )
        .nonempty({ message: "Debe ingresar al menos 1 pregunta" }),
});
