import { useSalesByCategoryAndBrand } from "../hooks/useSalesByCategoryAndBrand"

export function SalesByCategoryAndBrand() {
    const { salesByCategoryAndBrand, isLoading, error } = useSalesByCategoryAndBrand()

    if(isLoading) return <p>Cargando...</p>
    if(error) return <p>Error al cargar</p>

    return (
        <div>
            <h2>Ventas por categoría y marca</h2>
            {salesByCategoryAndBrand.map(category =>(
                <section key={category.categoryId}>
                    <h3>{category.categoryName}</h3>
                    <ul>
                        <li>Total de unidades vendidas: {category.totalQuantity}</li>
                        <li>Ingresos: ${category.totalRevenue}</li>
                    </ul>
                    <table>
                        <thead>
                            <tr>
                                <th>Marca</th>
                                <th>Unidades vendidas</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category.brands.map(brand =>(
                                <tr key={brand.brandId}>
                                    <td>{brand.brandName}</td>
                                    <td>{brand.totalQuantity}</td>
                                    <td>${brand.totalRevenue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            ))}
        </div>
    )
}