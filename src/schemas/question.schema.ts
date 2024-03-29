import { z } from "zod";
import { isValidId } from "../libs/validObjectId";

export const questionSchema = z.object({
    question: z
        .string({ required_error: "La pregunta es requerida" })
        .nonempty({ message: "La pregunta no puede estar vacía" }),
    options: z.array(z.string(), {
        required_error: "Las opciones son requeridas",
    }),
    correct: z.number({ required_error: "La respuesta correcta es requerida" }),
    category: z
        .string({ required_error: "La categoría es requerida" })
        .refine(isValidId, { message: "Identificador de categoría no válido" }),
    user: z
        .string({ required_error: "El usuario es requerido" })
        .refine(isValidId, { message: "Identificador de usuario no válido" })
        .optional(),
    verified: z.boolean().optional(),
    description: z
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
