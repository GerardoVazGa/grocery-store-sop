import { useEffect, useState } from "react";
import { reportsApi } from "../api/reports.api";

export function useDailySummary(period = "day") {
    const [dailySummary, setDailySummary] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDailySummary = async() => {
            try {
                setIsLoading(true)
                const data = await reportsApi.getDailySummary(period)
                setDailySummary(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchDailySummary()
    }, [period])

    return { dailySummary, isLoading, error }
}