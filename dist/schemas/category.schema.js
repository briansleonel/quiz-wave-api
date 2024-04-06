"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const zod_1 = require("zod");
exports.categorySchema = zod_1.z.object({
    name: zod_1.z
        .string({ required_error: "El nombre de la categoría es requerido" })
        .toLowerCase()
        .nonempty({ message: "El nombre de la categoría no puede estar vacío" }),
});
