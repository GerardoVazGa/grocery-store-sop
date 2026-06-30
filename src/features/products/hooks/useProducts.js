import { useCallback, useEffect, useState } from "react"
import { productsApi } from "../api/products.api"

export function useProducts() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        let isActive = true

        const fetchData = async () => {
            try {
                const data = await productsApi.getAll()
                if (isActive) {
                    setProducts(data)
                    setError(null)
                }
            } catch (err) {
                if (isActive) setError(err)
            } finally {
                if (isActive) setIsLoading(false)
            }
        }

        fetchData()

        return () => { isActive = false }
    }, [refreshKey])

    const refresh = useCallback(() => {
        setIsLoading(true)
        setRefreshKey((prev) => prev + 1)
    }, [])

    const createProduct = useCallback(async (product) => {
        await productsApi.create(product)
        refresh()
    }, [refresh])

    const updateProduct = useCallback(async (id, product) => {
        await productsApi.update(id, product)
        refresh()
    }, [refresh])

    return {
        products,
        isLoading,
        error,
        refresh,
        createProduct,
        updateProduct,
    }
}