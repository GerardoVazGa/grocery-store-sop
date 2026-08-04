import z from "zod";

export const brandSchema = z.object({
    name: z.string().min(1, "El nombre es requerido").max(50, "El nombre debe tener menos de 50 caracteres"),
    categoryId: z.coerce.number({ message: "Seleccione una categoría" }),
})