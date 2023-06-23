import { z } from "zod";
import { isValidId } from "../libs/validObjectId";

export const questionSchema = z.object({
    question: z
        .string({ required_error: "La pregunta es requerida" })
        .nonempty({ message: "La pregunta no puede estar vacía" }),
    options: z.object(
        {
            a: z
                .string({ required_error: "La opción es requerida" })
                .nonempty({ message: "La opción no puede estar vacía" }),
            b: z
                .string({ required_error: "La opción es requerida" })
                .nonempty({ message: "La opción no puede estar vacía" }),
            c: z
                .string({ required_error: "La opción es requerida" })
                .nonempty({ message: "La opción no puede estar vacía" }),
            d: z
                .string({ required_error: "La opción es requerida" })
                .nonempty({ message: "La opción no puede estar vacía" }),
        },
        { required_error: "Las opciones son requeridas" }
    ),
    correct: z.string({ required_error: "La respuesta correcta es requerida" }),
    category: z
        .string({ required_error: "La categoría es requerida" })
        .refine(isValidId, { message: "Identificador de categoría no válido" }),
    user: z
        .string({ required_error: "El usuario es requerido" })
        .refine(isValidId, { message: "Identificador de usuario no válido" }),
    verified: z.boolean().optional(),
    description: z
        .string({ required_error: "La descripción es requerida" })
        .nonempty({ message: "La descripción no puede estar vacía" }),
});
