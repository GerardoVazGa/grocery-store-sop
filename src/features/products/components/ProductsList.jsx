export function ProductsList({ products = [] }) {
    if (products.length === 0) {
        return <p>No hay productos registrados.</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Precio</th>
                    <th>Costo</th>
                    <th>Stock</th>
                </tr>
            </thead>

            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.barcode ?? "-"}</td>
                        <td>{product.name}</td>
                        <td>{product.categoryName}</td>
                        <td>{product.brandName ?? "-"}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>${product.cost.toFixed(2)}</td>
                        <td>{product.stock}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}