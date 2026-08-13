import { useEffect, useState } from "react";
import { reportsApi } from "../api/reports.api";

export function useTopProducts(period = "day") {
    const [topProducts, setTopProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopProducts = async() => {
            try {
                setIsLoading(true)
                const data = await reportsApi.getTopProductsByCategory(period)
                setTopProducts(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchTopProducts()
    }, [period])

    return { topProducts, isLoading, error }
}