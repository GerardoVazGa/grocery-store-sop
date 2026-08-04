import { CartItem } from "./CartItem"
import { PaymentMethod } from "./PaymentMethod"

export function Cart({ items, total, paymentMethod, onIncrease, onDecrease, onRemove, onPaymentMethodChange, onSubmit, isSubmitting, error }) {
    if (items.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl mb-2">🛒</p>
                    <p className="text-text-muted text-sm">El carrito está vacío</p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {items.map((item) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        onIncrease={onIncrease}
                        onDecrease={onDecrease}
                        onRemove={onRemove}
                    />
                ))}
            </div>

            <div className="p-4 border-t border-border space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Total</span>
                    <span className="text-2xl font-bold text-text">${total.toFixed(2)}</span>
                </div>

                <PaymentMethod value={paymentMethod} onChange={onPaymentMethodChange} />

                {error && <p className="text-danger text-sm">{error}</p>}

                <button
                    onClick={onSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent-hover text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
                >
                    {isSubmitting ? "Procesando..." : "💳 Cobrar"}
                </button>
            </div>
        </div>
    )
}