import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { categorySchema } from "../schema/categorySchema"

export function CategoryForm({ onSubmit: onSubmitCategory, defaultValues = {} }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            name: defaultValues.name ?? "",
        },
    })

    async function onSubmit(data) {
        await onSubmitCategory(data)
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Nombre</label>
                <input {...register("name")} placeholder="Ej. Botanas" />
                {errors.name && <span>{errors.name.message}</span>}
            </div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Guardar categoría"}
            </button>
        </form>
    )
}