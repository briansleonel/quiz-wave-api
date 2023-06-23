import { z } from "zod";

export const categorySchema = z.object({
    name: z
        .string({ required_error: "El nombre de la categoría es requerido" })
        .toLowerCase()
        .nonempty({message : "El nombre de la categoría no puede estar vacío"}),
});
