import { useDailySummary } from "../hooks/useDailySummary"

export function DailySummary() {
    const { dailySummary, isLoading, error } = useDailySummary()

    if (isLoading) return <div className="bg-surface rounded-xl p-6 animate-pulse h-48" />
    if (error) return <div className="bg-surface rounded-xl p-6 text-danger">Error al cargar</div>
    if (!dailySummary) return null

    const stats = [
        { label: "Total vendido", value: `$${dailySummary.totalRevenue ?? 0}`, accent: true },
        { label: "Ventas", value: dailySummary.totalSales ?? 0 },
        { label: "Ticket promedio", value: `$${dailySummary.averageSale ?? 0}` },
        { label: "Efectivo", value: `$${dailySummary.cashRevenue ?? 0}` },
        { label: "Tarjeta", value: `$${dailySummary.cardRevenue ?? 0}` },
    ]

    return (
        <div className="bg-surface rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-text mb-4">Resumen del día</h2>
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