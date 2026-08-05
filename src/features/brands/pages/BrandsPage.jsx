import { useState } from "react"
import { useCategories } from "../../categories/hooks/useCategories"
import { useBrands } from "../hooks/useBrands"
import { BrandForm } from "../components/BrandForm"

export function BrandsPage() {
    const { categories } = useCategories()
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const { brands, isLoading, createBrand } = useBrands(selectedCategoryId)

    const handleCreate = async (data) => {
        await createBrand(data)
        setShowForm(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text">Marcas</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary hover:bg-primary-light text-sidebar-text text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                >
                    {showForm ? "Cancelar" : "+ Nueva marca"}
                </button>
            </div>

            {showForm && (
                <div className="bg-primary-bg rounded-xl p-4 border border-border">
                    <BrandForm onSubmit={handleCreate} />
                </div>
            )}

            <div className="flex items-center gap-3">
                <label className="text-sm text-text-muted">Filtrar por categoría:</label>
                <select
                    onChange={(e) => setSelectedCategoryId(Number(e.target.value) || null)}
                    className="text-sm px-3 py-1.5 rounded-lg border border-border bg-surface text-text focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                    <option value="">Todas</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>

            {isLoading ? (
                <div className="animate-pulse h-32 bg-surface rounded-xl" />
            ) : (
                <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-primary-bg">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Nombre</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Categoría</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {brands.map((brand) => (
                                <tr key={brand.id} className="hover:bg-primary-bg transition-colors">
                                    <td className="px-6 py-3 text-sm text-text-muted">{brand.id}</td>
                                    <td className="px-6 py-3 text-sm font-medium text-text">{brand.name}</td>
                                    <td className="px-6 py-3 text-sm text-text-muted">{brand.categoryName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}