import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCategories } from "../../categories/hooks/useCategories.js"
import { useBrands } from "../../brands/hooks/useBrands.js"
import { productSchema } from "../schema/productSchema.js"
import { BarcodeScanner } from "../../sales/components/BarcodeScanner.jsx"

const inputClass = "w-full px-3 py-2 rounded-lg border border-border bg-primary-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
const labelClass = "block text-xs font-medium text-text-muted mb-1"
const errorClass = "text-xs text-danger mt-1"

export function ProductForm({ onCreate }) {
    const { categories } = useCategories()

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
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

    const handleBarcodeDetected = (barcode) => setValue("barcode", barcode)

    async function onSubmit(data) {
        await onCreate({
            ...data,
            barcode: data.barcode || null,
            brandId: data.brandId ? Number(data.brandId) : null,
        })
        reset()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <label className={labelClass}>Código de barras</label>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <input {...register("barcode")} placeholder="Opcional — escanea o escribe" className={inputClass} />
                    </div>
                    <BarcodeScanner onDetected={handleBarcodeDetected} compact />
                </div>
                {errors.barcode && <p className={errorClass}>{errors.barcode.message}</p>}
            </div>

            <div className="col-span-2">
                <label className={labelClass}>Nombre</label>
                <input {...register("name")} className={inputClass} />
                {errors.name && <p className={errorClass}>{errors.name.message}</p>}
            </div>

            <div>
                <label className={labelClass}>Categoría</label>
                <select {...register("categoryId")} className={inputClass}>
                    <option value="">Selecciona una categoría</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
                {errors.categoryId && <p className={errorClass}>{errors.categoryId.message}</p>}
            </div>

            <div>
                <label className={labelClass}>Marca</label>
                <select {...register("brandId")} disabled={!selectedCategoryId} className={inputClass}>
                    <option value="">Sin marca</option>
                    {brands.map((brand) => (
                        <option key={brand.id} value={brand.id}>{brand.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label className={labelClass}>Precio</label>
                <input type="number" step="0.01" {...register("price")} className={inputClass} />
                {errors.price && <p className={errorClass}>{errors.price.message}</p>}
            </div>

            <div>
                <label className={labelClass}>Costo</label>
                <input type="number" step="0.01" {...register("cost")} className={inputClass} />
                {errors.cost && <p className={errorClass}>{errors.cost.message}</p>}
            </div>

            <div>
                <label className={labelClass}>Stock inicial</label>
                <input type="number" {...register("stock")} className={inputClass} />
                {errors.stock && <p className={errorClass}>{errors.stock.message}</p>}
            </div>

            <div className="col-span-2 flex justify-end pt-2">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary hover:bg-primary-light text-sidebar-text font-medium px-6 py-2 rounded-xl transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? "Guardando..." : "Guardar producto"}
                </button>
            </div>
        </form>
    )
}