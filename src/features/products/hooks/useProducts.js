import { useCallback, useEffect, useState } from "react";
import { productsApi } from "../api/products.api";

export function useProducts() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loadProducts = useCallback(async () => {
        try {
            setIsLoading(true)
            
            const data = await productsApi.getAll();

            setProducts(data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            await loadProducts();
        }
        
        fetchData();
    }, [loadProducts]);

    return {
        products,
        isLoading,
        error,
        loadProducts,
    };
}