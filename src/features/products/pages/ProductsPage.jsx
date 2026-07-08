import { ProductForm } from "../components/ProductsForm"
import { ProductsList } from "../components/ProductsList.jsx"
import { useProducts } from "../hooks/useProducts"


export function ProductsPage() {
    const { products, isLoading, createProduct } = useProducts()

    const handleCreate = async (product) => {
        await createProduct(product)
    }

    return (
        <div>
            <h1>Productos</h1>
            <ProductForm onCreate={handleCreate} />
            <hr />
            {
                isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <ProductsList products={products} />
                )
            }

        </div>
    )
}