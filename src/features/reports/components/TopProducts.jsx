import { useTopProducts } from "../hooks/useTopProducts"

export function TopProducts() {
    const { topProducts, isLoading, error } = useTopProducts()

    if (isLoading) return <p>Cargando top productos...</p>
    if (error) return <p>Error al cargar top productos</p>
    if (topProducts.length === 0) return <p>Sin ventas registradas</p>

    return (
        <section>
            <h2>Top productos</h2>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {topProducts.map((product, index) => (
                        <tr key={index}>
                            <td>{product.productName}</td>
                            <td>{product.categoryName}</td>
                            <td>{product.totalQuantity}</td>
                            <td>${product.totalRevenue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}