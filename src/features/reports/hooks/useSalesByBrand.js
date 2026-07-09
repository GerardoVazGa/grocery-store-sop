import { useEffect, useState } from "react";
import { reportsApi } from "../api/reports.api";

export function useSalesByBrand() {
    const [salesByBrand, setSalesByBrand] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesByBrand = async() => {
            try {
                setIsLoading(true)
                const data = await reportsApi.getSalesByBrand()
                setSalesByBrand(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSalesByBrand()
    }, [])

    return { salesByBrand, isLoading, error }
}