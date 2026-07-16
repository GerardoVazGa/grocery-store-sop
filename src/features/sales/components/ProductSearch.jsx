import { ProductCard } from "./ProductCard"

export function ProductSearch({ query, onChangeQuery, isLoading, results, onAddProduct }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && results.length === 1) {
            onAddProduct(results[0])
        }
    }

    return (
        <div>
            <input
                value={query}
                placeholder="Buscar producto..."
                onKeyDown={handleKeyDown}
                onChange={(e) => onChangeQuery(e.target.value)}
            />
            {isLoading && <p>Loading...</p>}
            {results.length === 0 && query.length >= 2 && !isLoading && (
                <p>No se encontraron productos</p>
            )}
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                gap: "1rem",
            }}>
                {results.map((product) => (
                    <ProductCard 
                        key={product.id}
                        product={product}
                        onAdd={onAddProduct}
                    />
                ))}
            </div>
        </div>
    )
}