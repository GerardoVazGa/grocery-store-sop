import { useEffect, useState } from "react";
import { reportsApi } from "../api/reports.api";

export function useTopProducts() {
    const [topProducts, setTopProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopProducts = async() => {
            try {
                setIsLoading(true)
                const data = await reportsApi.getTopProductsByCategory()
                setTopProducts(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTopProducts()
    }, [])

    return { topProducts, isLoading, error }
}