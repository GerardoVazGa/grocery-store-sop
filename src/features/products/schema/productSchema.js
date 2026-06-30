import { z } from "zod"

export const productSchema = z.object({
    barcode: z.string().optional().transform((val) => val === "" ? null : val),
    name: z.string().min(1, "El nombre es requerido"),
    categoryId: z.coerce.number({ message: "Seleccione una categoría" }),
    brandId: z.coerce.number().optional().nullable(),
    price: z.coerce.number().positive("El precio debe ser mayor a 0"),
    cost: z.coerce.number().min(0, "El costo no puede ser negativo"),
    stock: z.coerce.number().int().min(0, "El stock no puede ser negativo"),
})