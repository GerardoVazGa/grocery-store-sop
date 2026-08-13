import { useDailySummary } from "../hooks/useDailySummary"
import { useReportsPeriodStore } from "../store/reportsStore"

const periodLabel = {
    day: "hoy",
    week: "esta semana",
    month: "este mes",
}

export function DailySummary() {
    const { period } = useReportsPeriodStore()
    const { dailySummary, isLoading, error } = useDailySummary(period)

    if (isLoading) return <div className="bg-surface rounded-xl p-6 animate-pulse h-48" />
    if (error) return <div className="bg-surface rounded-xl p-6 text-danger text-sm">Error al cargar</div>
    if (!dailySummary) return null

    const stats = [
        { label: "Total vendido", value: `$${Number(dailySummary.totalRevenue ?? 0).toLocaleString("es-MX", { minimumFractionDigits: 2 })}`, accent: true },
        { label: "Ventas", value: dailySummary.totalSales ?? 0 },
        { label: "Ticket promedio", value: `$${Number(dailySummary.averageSale ?? 0).toLocaleString("es-MX", { minimumFractionDigits: 2 })}` },
        { label: "Efectivo", value: `$${Number(dailySummary.cashRevenue ?? 0).toLocaleString("es-MX", { minimumFractionDigits: 2 })}` },
        { label: "Tarjeta", value: `$${Number(dailySummary.cardRevenue ?? 0).toLocaleString("es-MX", { minimumFractionDigits: 2 })}` },
    ]

    return (
        <div className="bg-surface rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-text mb-4">
                Resumen — {periodLabel[period]}
            </h2>
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