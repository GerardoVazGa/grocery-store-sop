import { useMemo, useReducer } from "react";

const initialState = {
    items: [],
    paymentMethod: "cash"
}

function cartReducer(state, action) {
    switch(action.type) {
        case "ADD_PRODUCT_TO_CART": {
            const existingProduct = state.items.find(item => item.id === action.product.id)
            if (existingProduct) {
                return {
                    ...state,
                    items: state.items.map(item => {
                        return item.id === action.product.id ? {
                            ...item,
                            quantity: item.quantity + 1,
                            subtotal: (item.quantity + 1) * item.price
                        } : item
                    })
                }
            }

            return {
                ...state,
                items: [
                    ...state.items,
                    {
                        ...action.product,
                        quantity: 1,
                        subtotal: action.product.price
                    }
                ]
            }
        }
        
        case "UPDATE_PRODUCT_QUANTITY": {
            if(action.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.productId)
                }
            }

            return {
                ...state,
                items: state.items.map(item => {
                    return item.id === action.productId ? {
                        ...item,
                        quantity: Math.min(item.quantity + 1, item.stock),
                        subtotal: action.quantity * item.price
                    } : item
                })
            }
        }

        case "INCREASE_QUANTITY": {
            return {
                ...state,
                items: state.items.map(item => {
                    return item.id === action.productId ? {
                        ...item,
                        quantity: Math.min(item.quantity + 1, item.stock),
                        subtotal: (item.quantity + 1) * item.price
                    } : item
                })
            }
        }

        case "DECREASE_QUANTITY": {
            const item = state.items.find(item => item.id === action.productId)

            if(!item) return state

            if(item.quantity === 1) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.productId)
                }
            }

            return {
                ...state,
                items: state.items.map(item => {
                    return item.id === action.productId ? {
                        ...item,
                        quantity: item.quantity - 1,
                        subtotal: (item.quantity - 1) * item.price
                    } : item
                })
            }
        }

        case "REMOVE_PRODUCT_FROM_CART": {
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.productId)
            }
        }

        case "SET_PAYMENT_METHOD": {
            return {
                ...state,
                paymentMethod: action.paymentMethod
            }
        }

        case "CLEAR_CART": {
            return initialState
        }

        default: {
            return state
        }
    }

}



export function useCart() {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    const addProductToCart = (product) => {
        if(product.outOfStock) return
        dispatch({
            type: "ADD_PRODUCT_TO_CART",
            product
        })
    }

    const updateProductQuantity = (productId, quantity) => {
        dispatch({
            type: "UPDATE_PRODUCT_QUANTITY",
            productId,
            quantity
        })
    }

    const increaseQuantity = (productId) => {
        dispatch({
            type: "INCREASE_QUANTITY",
            productId
        })
    } 

    const decreaseQuantity = (productId) => {
        dispatch({
            type: "DECREASE_QUANTITY",
            productId
        })
    }

    const removeProductFromCart = (productId) => {
        dispatch({
            type: "REMOVE_PRODUCT_FROM_CART",
            productId
        })
    }

    const clearCart = () => {
        dispatch({
            type: "CLEAR_CART"
        })
    }

    const setPaymentMethod = (paymentMethod) => {
        dispatch({
            type: "SET_PAYMENT_METHOD",
            paymentMethod
        })
    }

    const totalCart = useMemo(() => {
        return state.items.reduce((total, item) => total + item.subtotal, 0)
    }, [state.items])

    return {
        products: state.items,
        paymentMethod: state.paymentMethod,
        setPaymentMethod,
        addProductToCart,
        updateProductQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeProductFromCart,
        clearCart,
        totalCart
    }
    
}