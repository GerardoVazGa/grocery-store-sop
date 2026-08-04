export function CashCutSummary({summary, isLoading, error}) {

    if (isLoading) return <div className="bg-surface rounded-xl p-6 animate-pulse h-48" />
    if (error) return <div className="bg-surface rounded-xl p-6 text-danger">Error al cargar</div>
    if (!summary) return null

    const stats = [
        { label: "Total del día", value: `$${summary.totalAmount ?? 0}`, accent: true },
        { label: "Efectivo en caja", value: `$${summary.totalCash ?? 0}` },
        { label: "Tarjeta", value: `$${summary.totalCard ?? 0}` },
        { label: "Transferencia", value: `$${summary.totalTransfer ?? 0}` },
        { label: "Primera venta", value: summary.firstSaleTime ?? "-" },
        { label: "Última venta", value: summary.lastSaleTime ?? "-" },
    ]

    return (
        <div className="bg-surface rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-text mb-4">Corte de caja</h2>
            <div className="space-y-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex justify-between items-center">
                        <span className="text-sm text-text-muted">{stat.label}</span>
                        <span className={`font-semibold ${stat.accent ? "text-primary text-lg" : "text-text"}`}>
                            {stat.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}