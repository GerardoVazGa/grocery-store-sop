import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { brandSchema } from "../schema/brandSchema"
import { useCategories } from "../../categories/hooks/useCategories"

export function BrandForm({ onSubmit: onSubmitBrand, defaultValues = {} }) {
    const { categories } = useCategories()

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: defaultValues.name ?? "",
            categoryId: defaultValues.categoryId ?? "",
        },
    })

    async function onSubmit(data) {
        await onSubmitBrand(data)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nombre</label>
                <input {...register("name")} placeholder="Ej. Sabritas" />
                {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div>
                <label>Categoría</label>
                <select {...register("categoryId")}>
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && <span>{errors.categoryId.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar marca"}
            </button>
        </form>
    )
}