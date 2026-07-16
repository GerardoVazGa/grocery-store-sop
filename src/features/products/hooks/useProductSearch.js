import { useEffect, useState } from "react";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { productsApi } from "../api/products.api";

export function useProductSearch() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const debounceQuery = useDebounce(query, 400)

    useEffect(() => {
        async function searchProducts() {
            if(debounceQuery.trim().length < 2) {
                setResults([])
                return
            } 

            try {
                setIsLoading(true)
                const data = await productsApi.search(debounceQuery)
                setResults(data)
            } finally {
                setIsLoading(false)
            }
        }

        searchProducts()
    }, [debounceQuery])

    const clearSearch = () => {
        setQuery("")
        setResults([])
    }

    return {
        query,
        setQuery,
        results,
        isLoading,
        clearSearch
    }
}