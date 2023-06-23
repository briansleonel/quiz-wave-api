import { z } from "zod";
import { Role } from "../libs/role.enum";

/**
 * Error personalizado para un error de Zod
 *
 * @param issue
 * @param ctx
 * @returns mensaje para el error
 */
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
    if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: "Rol no válido" };
    }

    return { message: ctx.defaultError };
};

/**
 * Esquema para un determinado Registro a la aplicación
 */
export const registerSchema = z.object({
    username: z
        .string({ required_error: "El nombre de usuario es requerido" })
        .min(5, {
            message: `El nombre de usuario debe tener al menos 5 caracteres`,
        }),
    password: z
        .string({ required_error: "La contraseña es requerida" })
        .min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        }),
    email: z
        .string({ required_error: "El email es requerido" })
        .email({ message: "Email inválido" }),
    firstName: z.string({ required_error: "El nombre es requerido" }),
    lastName: z.string({ required_error: "El apellido es requerido" }),
    active: z.boolean().optional(),
    verified: z.boolean().optional(),
    role: z
        .nativeEnum(Role, {
            errorMap: customErrorMap,
        })
        .optional(),
});

/**
 * Esquema para un Logueo a la aplicacion
 */
export const loginSchema = z.object({
    username: z.string({ required_error: "El nombre de usuario es requerido" }),
    password: z.string({ required_error: "La contraseña es requerida" }),
});
