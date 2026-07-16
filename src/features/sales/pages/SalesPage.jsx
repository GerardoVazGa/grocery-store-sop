import { useProductSearch } from "../../products/hooks/useProductSearch";
import { Cart } from "../components/Cart";
import { ProductSearch } from "../components/ProductSearch";
import { useCart } from "../hooks/useCart";
import { useSalesSubmit } from "../hooks/useSalesSubmit";

export function SalesPage() {
    const { query, setQuery, results, isLoading } = useProductSearch()
    const { 
        products,
        totalCart,
        paymentMethod,
        increaseQuantity,
        decreaseQuantity,
        updateProductQuantity,
        removeProductFromCart,
        setPaymentMethod,
        clearCart,
        addProductToCart
    } = useCart()

    const {submitSale, isLoading: isLoadingSubmit, error} = useSalesSubmit({
        items: products,
        paymentMethod,
        onSuccess: clearCart
    })

    const handleSelectProduct = (product) => {
        addProductToCart(product)
    }
    return (
        <div>
            <h1>Punto de Venta</h1>
            <div style={{ display: "flex", gap: "1rem", height: "calc(100vh - 80px)" }}>
                <div style={{ flex: 1, overflowY: "auto" }}>
                    <ProductSearch 
                        query={query}
                        onChangeQuery={setQuery}
                        isLoading={isLoading}
                        results={results}
                        onAddProduct={handleSelectProduct}
                    />
                </div>
                <div style={{ width: "380px", borderLeft: "1px solid #ccc", paddingLeft: "1rem", overflowY: "auto" }}>
                    <Cart
                        items={products}
                        total={totalCart}
                        paymentMethod={paymentMethod}
                        onIncrease={increaseQuantity}
                        onDecrease={decreaseQuantity}
                        onUpdateQuantity={updateProductQuantity}
                        onRemove={removeProductFromCart}
                        onPaymentMethodChange={setPaymentMethod}
                        onSubmit={submitSale}
                        isSubmitting={isLoadingSubmit}
                        error={error}
                    />
                </div>
            </div>
        </div>
    )
}