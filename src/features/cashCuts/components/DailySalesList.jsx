export function DailySalesList({ sales = [] }) {
    const paymentLabel = {
        cash: "Efectivo",
        card: "Tarjeta",
        transfer: "Transferencia",
    }

    if (sales.length === 0) {
        return (
            <div className="bg-surface rounded-xl p-8 text-center shadow-sm">
                <p className="text-text-muted text-sm">No hay ventas registradas hoy</p>
            </div>
        )
    }

    return (
        <div className="bg-surface rounded-xl shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
                <h2 className="text-base font-semibold text-text">Ventas del día</h2>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border bg-primary-bg">
                        <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">#</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Fecha y hora</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Productos</th>
                        <th className="text-left px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Método</th>
                        <th className="text-right px-6 py-3 text-xs font-semibold text-text-muted uppercase tracking-wider">Total</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {sales.map((sale) => (
                        <tr key={sale.id} className="hover:bg-primary-bg transition-colors">
                            <td className="px-6 py-4 text-sm text-text-muted">#{sale.id}</td>
                            <td className="px-6 py-4 text-sm text-text">{sale.createdAt}</td>
                            <td className="px-6 py-4 text-sm text-text-muted">{sale.itemCount} producto{sale.itemCount !== 1 ? 's' : ''}</td>
                            <td className="px-6 py-4">
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                    sale.paymentMethod === "cash"
                                        ? "bg-primary-bg text-primary"
                                        : sale.paymentMethod === "card"
                                        ? "bg-accent/10 text-accent"
                                        : "bg-border text-text-muted"
                                }`}>
                                    {paymentLabel[sale.paymentMethod] ?? sale.paymentMethod}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-sm font-semibold text-text text-right">
                                ${sale.total.toFixed(2)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}