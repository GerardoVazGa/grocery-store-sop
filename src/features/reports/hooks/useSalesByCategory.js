import { useEffect, useState } from "react";
import { reportsApi } from "../api/reports.api";

export function useSalesByCategory(period = "day") {
    const [salesByCategory, setSalesByCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesByCategory = async() => {
            try {
                setIsLoading(true)
                const data = await reportsApi.getSalesByCategory(period)
                setSalesByCategory(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSalesByCategory()
    }, [period])

    return { salesByCategory, isLoading, error }
}