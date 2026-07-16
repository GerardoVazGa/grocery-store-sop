import { useState } from "react"
import { salesApi } from "../api/sales.api"

export function useSalesSubmit({items, paymentMethod, onSuccess}) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const submitSale = async () => {
        try {
            setIsLoading(true)
            setError(null)

            await salesApi.createSale({
                paymentMethod,
                items: items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            })

            onSuccess()
            
        } catch (error) {
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }
    
    return {
        submitSale,
        isLoading,
        error
    }
}