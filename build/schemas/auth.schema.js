"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
const role_enum_1 = require("../enums/role.enum");
/**
 * Error personalizado para un error de Zod
 *
 * @param issue
 * @param ctx
 * @returns mensaje para el error
 */
const customErrorMap = (issue, ctx) => {
    if (issue.code === zod_1.z.ZodIssueCode.invalid_enum_value) {
        return { message: "Rol no válido" };
    }
    return { message: ctx.defaultError };
};
/**
 * Esquema para un determinado Registro a la aplicación
 */
exports.registerSchema = zod_1.z.object({
    username: zod_1.z
        .string({ required_error: "El nombre de usuario es requerido" })
        .min(5, {
        message: `El nombre de usuario debe tener al menos 5 caracteres`,
    }),
    password: zod_1.z
        .string({ required_error: "La contraseña es requerida" })
        .min(8, {
        message: "La contraseña debe tener al menos 8 caracteres",
    }),
    email: zod_1.z
        .string({ required_error: "El email es requerido" })
        .email({ message: "Email inválido" }),
    firstName: zod_1.z.string({ required_error: "El nombre es requerido" }),
    lastName: zod_1.z.string({ required_error: "El apellido es requerido" }),
    active: zod_1.z.boolean().optional(),
    verified: zod_1.z.boolean().optional(),
    role: zod_1.z
        .nativeEnum(role_enum_1.Role, {
        errorMap: customErrorMap,
    })
        .optional(),
});
/**
 * Esquema para un Logueo a la aplicacion
 */
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string({ required_error: "El nombre de usuario es requerido" }),
    password: zod_1.z.string({ required_error: "La contraseña es requerida" }),
});
