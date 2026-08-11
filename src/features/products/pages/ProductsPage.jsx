import { useState } from "react"
import { ProductForm } from "../components/ProductsForm"
import { ProductsList } from "../components/ProductsList.jsx"
import { useProducts } from "../hooks/useProducts"


export function ProductsPage() {
    const { products, isLoading, createProduct, updateProduct, deleteProduct } = useProducts()
    const [showForm, setShowForm] = useState(false)

    const handleCreate = async (product) => {
        await createProduct(product)
        setShowForm(false)
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-text">Productos</h1>
                    <p className="text-text-muted text-sm mt-1">
                        {products.length} productos registrados
                    </p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-primary hover:bg-primary-light text-sidebar-text font-medium px-4 py-2 rounded-xl transition-colors"
                >
                    {showForm ? "Cancelar" : "+ Nuevo producto"}
                </button>
            </div>

            {showForm && (
                <div className="bg-surface rounded-xl p-6 shadow-sm border border-border">
                    <h2 className="text-base font-semibold text-text mb-4">Nuevo producto</h2>
                    <ProductForm onCreate={handleCreate} />
                </div>
            )}

            {isLoading ? (
                <div className="bg-surface rounded-xl p-6 animate-pulse h-48" />
            ) : (
                <ProductsList 
                    products={products} 
                    onEdit={updateProduct}
                    onDelete={deleteProduct}
                />
            )}
        </div>
    )
}