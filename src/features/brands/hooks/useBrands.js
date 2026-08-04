import { useCallback, useEffect, useState } from "react";
import { brandsApi } from "../api/brands.api";

export function useBrands(categoryId) {
    const [brands, setBrands] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [refreshKey, setRefreshKey] = useState(0)

    useEffect(() => {
        if (!categoryId) {
            return
        }

        let isActive = true

        const fetchData = async () => {
            try {
                setIsLoading(true)
                const data = await brandsApi.getByCategory(categoryId);

                if(isActive) {
                    setBrands(data)
                    setError(null)
                }

            } catch (error) {
                if(isActive) setError(error)
            } finally {
                if(isActive) setIsLoading(false);
            }

        }

        fetchData()

        return () => { isActive = false }
    }, [categoryId, refreshKey])


    const refresh = useCallback(() => {
        setIsLoading(true)
        setRefreshKey(key => key + 1)
    }, [])

    const createBrand = useCallback(async (brand) => {
        await brandsApi.create(brand)
        refresh()
    }, [refresh])

    const updateBrand = useCallback(async (id, brand) => {
        await brandsApi.update(id, brand)
        refresh()
    }, [refresh])

    return {
        brands: categoryId ? brands : [],
        isLoading,
        error,
        refresh,
        createBrand,
        updateBrand
    };
}