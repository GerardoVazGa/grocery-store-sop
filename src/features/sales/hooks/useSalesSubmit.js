import { useState } from "react"
import { salesApi } from "../api/sales.api"

export function useSalesSubmit({items, paymentMethod, onSuccess}) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [completedSale, setCompletedSale] = useState(null)

    const submitSale = async () => {
        try {
            setIsLoading(true)
            setError(null)

            const sale = await salesApi.createSale({
                paymentMethod,
                items: items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            })

            setCompletedSale(sale)

            return sale
        } catch (error) {
            setError(error.message)
            return null
        } finally {
            setIsLoading(false)
        }
    }

    const clearCompletedSale = () => {
        setCompletedSale(null)
        onSuccess()
    }
    
    return {
        submitSale,
        completedSale,
        clearCompletedSale,
        isLoading,
        error
    }
}