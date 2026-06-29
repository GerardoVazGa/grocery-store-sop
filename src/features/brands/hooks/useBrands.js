import { useCallback, useEffect, useState } from "react";
import { brandsApi } from "../api/brands.api";

export function useBrands(categoryId) {
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadBrands = useCallback(async () => {

        if (!categoryId) {
            setBrands([]);
            return;
        }

        try {
            const data = await brandsApi.getByCategory(categoryId);

            setBrands(data);
            setError(null);

        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }

    }, [categoryId]);

    useEffect(() => {
        const fetchData = async () => {
            await loadBrands();
        }

        fetchData();
    }, [loadBrands]);

    return {
        brands,
        isLoading,
        error,
        loadBrands
    };
}