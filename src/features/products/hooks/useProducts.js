import { useEffect, useState } from "react"

export function useProducts() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        window.api.products.getAll()
            .then((data) => {
                setProducts(data)
            })
            .catch((error) => console.error(error))
            .finally(() => setIsLoading(false))
    }, [])

    return { products, isLoading }
}