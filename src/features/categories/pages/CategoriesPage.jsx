import { useCategories } from "../hooks/useCategories"
import { CategoryForm } from "../components/CategoryForm"
import { useState } from "react"

export function CategoriesPage() {
    const { categories, isLoading, createCategory } = useCategories()
    const [showForm, setShowForm] = useState(false)

    const handleCreate = async (data) => {
        await createCategory(data)
        setShowForm(false)
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-text">Categorías</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary hover:bg-primary-light text-sidebar-text text-sm font-medium px-4 py-2 rounded-xl transition-colors"
                >
                    {showForm ? "Cancelar" : "+ Nueva categoría"}
                </button>
            </div>

            {showForm && (
                <div className="bg-primary-bg rounded-xl p-4 border border-border">
                    <CategoryForm onSubmit={handleCreate} />
                </div>
            )}

            {isLoading ? (
                <div className="animate-pulse h-32 bg-surface rounded-xl" />
            ) : (
                <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-border bg-primary-bg">
                                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">ID</th>
                                <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Nombre</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {categories.map((category) => (
                                <tr key={category.id} className="hover:bg-primary-bg transition-colors">
                                    <td className="px-6 py-3 text-sm text-text-muted">{category.id}</td>
                                    <td className="px-6 py-3 text-sm font-medium text-text">{category.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}