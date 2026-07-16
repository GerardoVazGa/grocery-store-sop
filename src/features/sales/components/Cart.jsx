import { CartItem } from "./CartItem"
import { PaymentMethod } from "./PaymentMethod"

export function Cart({ items, total, paymentMethod, onIncrease, onDecrease, onRemove, onPaymentMethodChange, onSubmit, isSubmitting, error }) {
    if (items.length === 0) {
        return <p>El carrito está vacío</p>
    }

    return (
        <div>
            <h2>Carrito</h2>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio</th>
                        <th>Subtotal</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onIncrease={onIncrease}
                            onDecrease={onDecrease}
                            onRemove={onRemove}
                        />
                    ))}
                </tbody>
            </table>

            <p>Total: ${total.toFixed(2)}</p>

            <PaymentMethod value={paymentMethod} onChange={onPaymentMethodChange} />

            {error && <p>{error}</p>}

            <button onClick={onSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Procesando..." : "Cobrar"}
            </button>
        </div>
    )
}