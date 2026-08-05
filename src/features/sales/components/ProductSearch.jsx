import { productsApi } from "../../products/api/products.api"
import { BarcodeScanner } from "./BarcodeScanner"
import { ProductCard } from "./ProductCard"

export function ProductSearch({ query, onChangeQuery, isLoading, results, onAddProduct }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && results.length === 1) {
            onAddProduct(results[0])
        }
    }

    const handleBarcodeDetected = async (barcode) => {
        const product = await productsApi.findByBarCode(barcode)
        if (product) {
            onAddProduct(product)
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex items-start gap-3">
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/3 -translate-y-1/2 text-text-muted">🔍</span>
                    <input
                        value={query}
                        onChange={(e) => onChangeQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Buscar por nombre, categoría o marca..."
                        autoFocus
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-surface text-text placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                </div>
                <BarcodeScanner onDetected={handleBarcodeDetected} />
            </div>

            {isLoading && (
                <p className="text-text-muted text-sm">Buscando...</p>
            )}

            {results.length === 0 && query.length >= 2 && !isLoading && (
                <p className="text-text-muted text-sm">No se encontraron productos</p>
            )}

            <div className="grid grid-cols-3 gap-4">
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