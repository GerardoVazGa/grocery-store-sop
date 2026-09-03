import { useState } from "react"
import { useProductSearch } from "../../products/hooks/useProductSearch"
import { Cart } from "../components/Cart"
import { ProductSearch } from "../components/ProductSearch"
import { TicketPreview } from "../components/TicketPreview"
import { useCart } from "../hooks/useCart"
import { useSalesSubmit } from "../hooks/useSalesSubmit"
import { SaleConfirmModal } from "../components/SaleConfirmModal"
import { usePrinter } from "../hooks/usePrinter"
import { SaleSuccess } from "../components/SaleSuccess"

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
        addProductToCart,
    } = useCart()

    const {
        submitSale,
        isLoading: isLoadingSubmit,
        error,
        completedSale,
        clearCompletedSale,
    } = useSalesSubmit({
        items: products,
        paymentMethod,
        onSuccess: clearCart,
    })

    const [saleStep, setSaleStep] = useState(null)

    const {hasPrinter, printerName} = usePrinter()

    const handleOpenConfirmModal = () => {
        if(products.length === 0) return

        setSaleStep("confirming")
    }

    const handleConfirmSale = async () => {
        await submitSale()
        setSaleStep("success")
    }

    const handleCancelSale = () => {
        clearCompletedSale()
        setSaleStep(null)
    }

    const handleNewSale = () => {
        clearCompletedSale()
        setSaleStep(null)
    }

    const handleViewTicket = () => {
        setSaleStep("ticket")
    }

    const handleSelectProduct = (product) => {
        addProductToCart(product)
    }

    const handlePrint = async () => {
        try {
            await window.api.printer.print({
                sale: completedSale,
                storeName: "Abarrotes POS",
                printerName: printerName,
            })
        } catch (err) {
            console.error("Error al imprimir:", err)
        } finally {
            handleNewSale() // cerrar modal de ticket y volver a nueva venta
        }
    }

    return (
        <div className="flex h-full">
            <div className="flex-1 flex flex-col p-6 overflow-hidden">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-text">Ventas</h1>
                    <p className="text-text-muted text-sm mt-1">
                        Escanea o busca productos para agregar al carrito
                    </p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <ProductSearch
                        query={query}
                        onChangeQuery={setQuery}
                        isLoading={isLoading}
                        results={results}
                        onAddProduct={handleSelectProduct}
                    />
                </div>
            </div>

            <div className="w-96 border-l border-border bg-surface flex flex-col">
                <div className="p-4 border-b border-border flex items-center justify-between">
                    <h2 className="font-semibold text-text">Carrito</h2>
                    {products.length > 0 && (
                        <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {products.length} productos
                        </span>
                    )}
                </div>
                <Cart
                    items={products}
                    total={totalCart}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onUpdateQuantity={updateProductQuantity}
                    onRemove={removeProductFromCart}
                    onSubmit={handleOpenConfirmModal}
                    isSubmitting={isLoadingSubmit}
                    error={error}
                />
            </div>

            {saleStep === "confirming" && (
                <SaleConfirmModal
                    items={products}
                    total={totalCart}
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={setPaymentMethod}
                    onConfirm={handleConfirmSale}
                    onCancel={handleCancelSale}
                    isSubmitting={isLoadingSubmit}
                    error={error}
                />
            )}

            {saleStep === "success" && completedSale && (
                <SaleSuccess
                    hasPrinter={hasPrinter}
                    sale={completedSale}
                    onViewTicket={handleViewTicket}
                    onPrint={handlePrint}
                    onNewSale={handleNewSale}
                />
            )}

            {saleStep === "ticket" && completedSale  && (
                <TicketPreview
                    sale={completedSale}
                    onClose={clearCompletedSale}
                    onPrint={handlePrint}
                />
            )}
        </div>
    )
}