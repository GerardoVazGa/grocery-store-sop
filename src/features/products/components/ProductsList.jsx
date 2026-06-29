import { useProducts } from "../hooks/useProducts"

export function ProductsList() {
    const {
        products,
        isLoading
    } = useProducts()

    if (isLoading) return <p>Cargando productos...</p>

    return (
        <ul>
            {products.map((product) => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
    )
}