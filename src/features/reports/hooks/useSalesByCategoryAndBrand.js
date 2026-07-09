import { useEffect, useState } from "react";
import { reportsApi } from "../api/reports.api";

export function useSalesByCategoryAndBrand() {
    const [salesByCategoryAndBrand, setSalesByCategoryAndBrand] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesByCategoryAndBrand = async() => {
            try {
                setIsLoading(true)
                const data = await reportsApi.getSalesByCategoryAndBrand()
                setSalesByCategoryAndBrand(data)
                setError(null)
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchSalesByCategoryAndBrand()
    }, [])

    return { salesByCategoryAndBrand, isLoading, error }
}