import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { brandSchema } from "../schema/brandSchema"
import { useCategories } from "../../categories/hooks/useCategories"

export function BrandForm({ onSubmit: onSubmitProp, defaultValues = {} }) {
    const { categories } = useCategories()
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(brandSchema),
        defaultValues: { name: defaultValues.name ?? "", categoryId: defaultValues.categoryId ?? "" },
    })

    async function onSubmit(data) {
        await onSubmitProp(data)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-3 items-end">
            <div className="flex-1">
                <label className="block text-xs font-medium text-text-muted mb-1">Nombre</label>
                <input
                    {...register("name")}
                    placeholder="Ej. Sabritas"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                />
                {errors.name && <p className="text-xs text-danger mt-1">{errors.name.message}</p>}
            </div>
            <div className="flex-1">
                <label className="block text-xs font-medium text-text-muted mb-1">Categoría</label>
                <select
                    {...register("categoryId")}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
                >
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.categoryId && <p className="text-xs text-danger mt-1">{errors.categoryId.message}</p>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary-light text-sidebar-text text-sm font-medium px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
            >
                {isSubmitting ? "Guardando..." : "Guardar"}
            </button>
        </form>
    )
}