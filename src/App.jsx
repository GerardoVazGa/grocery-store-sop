import './App.css'
import { ProductForm } from './features/products/components/ProductsForm.jsx'
import { ProductsList } from './features/products/components/ProductsList.jsx'
import { useProducts } from './features/products/hooks/useProducts.js'

function App() {
  const { products, isLoading, createProduct } = useProducts()

  const handleCreate = async (product) => {
    await createProduct(product)
  }
  
  return (
    <div>
      <h1>Productos</h1>
      <ProductForm onCreate={handleCreate}/>
      <hr/>
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

export default App
