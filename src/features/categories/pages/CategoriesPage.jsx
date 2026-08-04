import { useCategories } from "../hooks/useCategories"
import { CategoryForm } from "../components/CategoryForm"

export function CategoriesPage() {
    const { categories, isLoading, createCategory } = useCategories()

    return (
        <div>
            <h1>Categorías</h1>
            <CategoryForm onSubmit={createCategory} />
            <hr />
            {isLoading ? (
                <p>Cargando categorías...</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category) => (
                            <tr key={category.id}>
                                <td>{category.id}</td>
                                <td>{category.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}