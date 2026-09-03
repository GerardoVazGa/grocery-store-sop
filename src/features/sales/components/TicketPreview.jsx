export function TicketPreview({ sale, onClose, onPrint }) {
    const { items, total, paymentMethod, id } = sale
    const date = new Date().toLocaleString("es-MX")

    const paymentLabel = {
        cash: "Efectivo",
        card: "Tarjeta",
        transfer: "Transferencia",
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-xl shadow-xl w-full max-w-sm p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-text">Ticket de venta</h2>
                    <button onClick={onClose} className="text-text-muted hover:text-text">✕</button>
                </div>

                <div className="bg-white border border-border rounded-lg p-4 font-mono text-xs space-y-2 mb-4">
                    <p className="text-center font-bold text-sm">Abarrotes POS</p>
                    <p className="text-center text-gray-500">Ticket de venta</p>
                    <div className="border-t border-dashed border-gray-300" />
                    <p>Fecha: {date}</p>
                    <p>Venta #{id}</p>
                    <div className="border-t border-dashed border-gray-300" />
                    <table className="w-full">
                        <thead>
                            <tr className="text-gray-500">
                                <th className="text-left">Producto</th>
                                <th className="text-center">Cant</th>
                                <th className="text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-left truncate max-w-[120px]">{item.productName}</td>
                                    <td className="text-center">{item.quantity}</td>
                                    <td className="text-right">${Number(item.subtotal).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="border-t border-dashed border-gray-300" />
                    <p className="text-right font-bold text-sm">
                        TOTAL: ${Number(total).toFixed(2)}
                    </p>
                    <p className="text-right text-gray-500">
                        {paymentLabel[paymentMethod] ?? paymentMethod}
                    </p>
                    <div className="border-t border-dashed border-gray-300" />
                    <p className="text-center text-gray-500">¡Gracias por su compra!</p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 rounded-xl border border-border text-text-muted hover:bg-primary-bg text-sm transition-colors"
                    >
                        Cerrar
                    </button>
                    <button
                        onClick={onPrint}
                        className="flex-1 px-4 py-2 rounded-xl bg-primary hover:bg-primary-light text-sidebar-text text-sm font-medium transition-colors"
                        title="Requiere impresora térmica"
                    >
                        🖨️ Imprimir
                    </button>
                </div>
            </div>
        </div>
    )
}