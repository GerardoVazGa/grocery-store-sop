export function ProductCard({ product, onAdd }) {
    return (
        <div className={`bg-surface rounded-xl p-4 shadow-sm border border-border transition-shadow hover:shadow-md ${product.outOfStock ? "opacity-50" : ""}`}>
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs text-text-muted">{product.categoryName}</span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${product.outOfStock ? "bg-danger/10 text-danger" : "bg-primary-bg text-primary"}`}>
                    {product.outOfStock ? "Agotado" : `${product.stock} uds`}
                </span>
            </div>
            <p className="font-semibold text-text text-sm mb-1">{product.name}</p>
            <p className="text-xs text-text-muted mb-3">{product.brandName ?? "Sin marca"}</p>
            <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-text">${product.price.toFixed(2)}</span>
                <button
                    onClick={() => onAdd(product)}
                    disabled={product.outOfStock}
                    className="bg-accent hover:bg-accent-hover disabled:opacity-50 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                >
                    + Agregar
                </button>
            </div>
        </div>
    )
}