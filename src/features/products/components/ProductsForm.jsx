import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCategories } from "../../categories/hooks/useCategories.js"
import {useBrands} from "../../brands/hooks/useBrands.js"
import { productSchema } from "../schema/productSchema.js"

export function ProductForm({ onCreate }) {
    const { categories } = useCategories()

    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            barcode: "",
            name: "",
            categoryId: "",
            brandId: "",
            price: "",
            cost: "",
            stock: "",
        },
    })

    const selectedCategoryId = useWatch({ control, name: "categoryId" })

    const { brands } = useBrands(selectedCategoryId ? Number(selectedCategoryId) : null)

    async function onSubmit(data) {
        await onCreate({
            ...data,
            brandId: data.brandId ? Number(data.brandId) : null,
        })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Código de barras</label>
                <input {...register("barcode")} />
                {errors.barcode && <span>{errors.barcode.message}</span>}
            </div>

            <div>
                <label>Nombre</label>
                <input {...register("name")} />
                {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div>
                <label>Categoría</label>
                <select {...register("categoryId")}>
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                        <option 
                            key={category.id} 
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && <span>{errors.categoryId.message}</span>}
            </div>

            <div>
                <label>Marca</label>
                <select {...register("brandId")} disabled={!selectedCategoryId}>
                    <option value="">Sin marca</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>
                            {brand.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Precio</label>
                <input type="number" step="0.01" {...register("price")} />
                {errors.price && <span>{errors.price.message}</span>}
            </div>

            <div>
                <label>Costo</label>
                <input type="number" step="0.01" {...register("cost")} />
                {errors.cost && <span>{errors.cost.message}</span>}
            </div>

            <div>
                <label>Stock</label>
                <input type="number" {...register("stock")} />
                {errors.stock && <span>{errors.stock.message}</span>}
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Agregar producto"}
            </button>
        </form>
    )
}