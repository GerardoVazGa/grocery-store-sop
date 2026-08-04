import { useCategories } from "../../categories/hooks/useCategories"
import { useBrands } from "../hooks/useBrands"
import { BrandForm } from "../components/BrandForm"
import { useState } from "react"

export function BrandsPage() {
    const { categories } = useCategories()
    const [selectedCategoryId, setSelectedCategoryId] = useState(null)
    const { brands, isLoading, createBrand } = useBrands(selectedCategoryId)

    return (
        <div>
            <h1>Marcas</h1>
            <BrandForm onSubmit={createBrand} />
            <hr />
            <div>
                <label>Filtrar por categoría:</label>
                <select onChange={(e) => setSelectedCategoryId(Number(e.target.value) || null)}>
                    <option value="">Todas</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            {isLoading ? (
                <p>Cargando marcas...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Categoría</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands.map((brand) => (
                            <tr key={brand.id}>
                                <td>{brand.id}</td>
                                <td>{brand.name}</td>
                                <td>{brand.categoryName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}