import { useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { productSchema } from "../schema/productSchema"
import { useCategories } from "../../categories/hooks/useCategories"
import { useBrands } from "../../brands/hooks/useBrands"
import { BarcodeScanner } from "../../sales/components/BarcodeScanner"

const inputClass = "w-full px-3 py-2 rounded-lg border border-border bg-primary-bg text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm"
const labelClass = "block text-xs font-medium text-text-muted mb-1"
const errorClass = "text-xs text-danger mt-1"

export function ProductEditModal({ product, onSave, onClose }) {
    const { categories } = useCategories()

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            barcode: product.barcode ?? "",
            name: product.name,
            categoryId: product.categoryId,
            brandId: product.brandId ?? "",
            price: product.price,
            cost: product.cost,
            stock: product.stock,
        },
    })

    const selectedCategoryId = useWatch({ control, name: "categoryId" })
    const { brands } = useBrands(selectedCategoryId ? Number(selectedCategoryId) : null)

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-xl shadow-xl w-full max-w-lg p-6">
                <div 
                    className="flex items-center justify-between mb-5"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-base font-semibold text-text">Editar producto</h2>
                    <button
                        onClick={onClose}
                        className="text-text-muted hover:text-text transition-colors text-lg"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSave)} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <label className={labelClass}>Código de barras</label>
                        <div className="flex gap-2 items-center">
                            <div className="w-64">
                                <input
                                    {...register("barcode")}
                                    placeholder="Opcional"
                                    className={inputClass}
                                />
                            </div>
                            <div onClick={(e) => e.stopPropagation()}>
                                <BarcodeScanner onDetected={(barcode) => setValue("barcode", barcode)} compact />
                            </div>
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
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
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
                        <label className={labelClass}>Stock</label>
                        <input type="number" {...register("stock")} className={inputClass} />
                        {errors.stock && <p className={errorClass}>{errors.stock.message}</p>}
                    </div>

                    <div className="col-span-2 flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 rounded-xl border border-border text-text-muted hover:bg-primary-bg text-sm transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary hover:bg-primary-light text-sidebar-text font-medium px-6 py-2 rounded-xl transition-colors disabled:opacity-50 text-sm"
                        >
                            {isSubmitting ? "Guardando..." : "Guardar cambios"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}