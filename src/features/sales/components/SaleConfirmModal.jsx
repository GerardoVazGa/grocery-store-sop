import { PaymentMethod } from "./PaymentMethod.jsx"
export function SaleConfirmModal({ items, total, paymentMethod, onPaymentMethodChange, onConfirm, onCancel, isSubmitting, error }) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-xl shadow-xl w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold text-text">Confirmar venta</h2>
                    <button onClick={onCancel} className="text-text-muted hover:text-text">✕</button>
                </div>

                {/* Items */}
                <div className="bg-primary-bg rounded-xl p-4 space-y-2 mb-4">
                    {items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-text">{item.name}</p>
                                <p className="text-xs text-text-muted">x{item.quantity} × ${item.price.toFixed(2)}</p>
                            </div>
                            <span className="text-sm font-semibold text-text">
                                ${item.subtotal.toFixed(2)}
                            </span>
                        </div>
                    ))}
                    <div className="border-t border-border pt-3 flex justify-between items-center">
                        <span className="text-sm font-semibold text-text">Total</span>
                        <span className="text-xl font-bold text-primary">
                            ${total.toFixed(2)}
                        </span>
                    </div>
                </div>

                <div className="mb-4">
                    <p className="text-xs font-medium text-text-muted mb-2">Método de pago</p>
                    <PaymentMethod value={paymentMethod} onChange={onPaymentMethodChange} />
                </div>

                {error && (
                    <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 mb-4">
                        {error}
                    </div>
                )}

                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-border text-text-muted hover:bg-primary-bg text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? "Procesando..." : "✓ Confirmar pago"}
                    </button>
                </div>
            </div>
        </div>
    )
}