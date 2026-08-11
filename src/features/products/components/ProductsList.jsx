import { useState } from "react"
import { ProductEditModal } from "./ProductEditModal"

export function ProductsList({ products = [], onEdit, onDelete }) {
    const [editingProduct, setEditingProduct] = useState(null)

    if (products.length === 0) {
        return (
            <div className="bg-surface rounded-xl p-12 text-center shadow-sm">
                <p className="text-4xl mb-2">📦</p>
                <p className="text-text-muted">No hay productos registrados</p>
            </div>
        )
    }

    return (
        <>
            <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border bg-primary-bg">
                            <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Código</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Nombre</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Categoría</th>
                            <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Marca</th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Precio</th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Costo</th>
                            <th className="text-right px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Stock</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-primary-bg transition-colors">
                                <td className="px-6 py-4 text-sm text-text-muted font-mono">
                                    {product.barcode ?? "—"}
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-text">{product.name}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs bg-primary-bg text-primary font-medium px-2 py-1 rounded-full">
                                        {product.categoryName}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-text-muted">
                                    {product.brandName ?? "—"}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold text-text text-right">
                                    ${product.price.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-sm text-text-muted text-right">
                                    ${product.cost.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                        product.stock === 0
                                            ? "bg-danger/10 text-danger"
                                            : product.stock < 5
                                            ? "bg-accent/10 text-accent"
                                            : "bg-primary-bg text-primary"
                                    }`}>
                                        {product.stock} uds
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button
                                            onClick={() => setEditingProduct(product)}
                                            className="text-xs text-primary hover:underline font-medium"
                                        >
                                            Editar
                                        </button>
                                        <span className="text-border">|</span>
                                        <button
                                            onClick={() => onDelete(product.id)}
                                            className="text-xs text-danger hover:underline font-medium"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingProduct && (
                <ProductEditModal
                    product={editingProduct}
                    onSave={async (data) => {
                        await onEdit(editingProduct.id, data)
                        setEditingProduct(null)
                    }}
                    onClose={() => setEditingProduct(null)}
                />
            )}
        </>
    )
}