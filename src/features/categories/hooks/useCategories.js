import { useCallback, useEffect, useState } from "react"
import { categoriesApi } from "../api/categories.api"

export function useCategories() {
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [refreshKey, setRefreshKey] = useState(0)

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
    }, [refreshKey])

    const refresh = useCallback(() => {
        setRefreshKey((prev) => prev + 1)
    }, [])

    const createCategory = useCallback(async (category) => {
        await categoriesApi.create(category)
        refresh()
    }, [refresh])

    const updateCategory = useCallback(async (id, category) => {
        await categoriesApi.update(id, category)
        refresh()
    }, [refresh])

    return { categories, isLoading, error, createCategory, updateCategory, refresh }
}