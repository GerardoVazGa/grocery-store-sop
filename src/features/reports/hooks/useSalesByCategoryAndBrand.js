import { useEffect, useState } from "react";
import { reportsApi } from "../api/reports.api";
import { groupSalesByCategory } from "../utils/mappers/groupSalesByCategory";

export function useSalesByCategoryAndBrand() {
    const [salesByCategoryAndBrand, setSalesByCategoryAndBrand] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSalesByCategoryAndBrand = async() => {
            try {
                setIsLoading(true)
                const data = await reportsApi.getSalesByCategoryAndBrand()
                setSalesByCategoryAndBrand(groupSalesByCategory(data))
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