import z from "zod";

export const cashCutsSchema = z.object({
    openingAmount: z.coerce.number().min(0, "El monto de apertura no puede ser negativo"),
})