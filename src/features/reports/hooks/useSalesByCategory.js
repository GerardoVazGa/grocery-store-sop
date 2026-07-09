import { useEffect, useState } from "react";
import { reportsApi } from "../api/reports.api";

export function useSalesByCategory() {
    const [salesByCategory, setSalesByCategory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesByCategory = async() => {
            try {
                setIsLoading(true)
                const data = await reportsApi.getSalesByCategory()
                setSalesByCategory(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSalesByCategory()
    }, [])

    return { salesByCategory, isLoading, error }
}