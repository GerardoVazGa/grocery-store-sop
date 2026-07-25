import { useEffect, useState } from "react";
import { cashCutsApi } from "../api/cashCuts.api";

export function useDailySales() {
    const [dailySales, setDailySales] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDailySales = async () => {
            try {
                setIsLoading(true)
                const data = await cashCutsApi.getDailySales()
                setDailySales(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDailySales()
    }, [])

    return { dailySales, isLoading, error }
}