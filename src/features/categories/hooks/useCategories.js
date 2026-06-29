import { useEffect, useState } from "react"
import { categoriesApi } from "../api/categories.api"

export function useCategories() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)


    useEffect(() => {
        async function fetchData() {
            try {
                const categories = await categoriesApi.getAll()
                setCategories(categories)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    return { categories, isLoading, error }
}