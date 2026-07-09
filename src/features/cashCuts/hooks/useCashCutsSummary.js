import { useEffect, useState } from "react";
import { cashCutsApi } from "../api/cashCuts.api";

export function useCashCutsSummary() {
    const [cashCutsSummary, setCashCutsSummary] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCashCutsSummary = async() => {
            try {
                setIsLoading(true)
                const data = await cashCutsApi.getSummary()
                setCashCutsSummary(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchCashCutsSummary()
    }, [])

    return { cashCutsSummary, isLoading, error }
}