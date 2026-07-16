export function ProductCard({ product, onAdd }) {
    return (
        <div style={{
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "12px",
            opacity: product.outOfStock ? 0.5 : 1,
        }}>
            <p><strong>{product.name}</strong></p>
            <p>{product.categoryName} / {product.brandName ?? "-"}</p>
            <p>${product.price.toFixed(2)}</p>
            <p>Stock: {product.stock}</p>
            <button
                onClick={() => onAdd(product)}
                disabled={product.outOfStock}
            >
                {product.outOfStock ? "Agotado" : "+ Agregar"}
            </button>
        </div>
    )
}