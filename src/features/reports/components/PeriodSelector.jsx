import { useReportsPeriodStore } from "../store/reportsStore"

const periods = [
    { id: "day", label: "Hoy" },
    { id: "week", label: "Esta semana" },
    { id: "month", label: "Este mes" },
]

export function PeriodSelector() {
    const { period, setPeriod } = useReportsPeriodStore()

    return (
        <div className="flex gap-1 bg-primary-bg rounded-xl p-1 border border-border">
            {periods.map((p) => (
                <button
                    key={p.id}
                    onClick={() => setPeriod(p.id)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        period === p.id
                            ? "bg-primary text-sidebar-text shadow-sm"
                            : "text-text-muted hover:text-text"
                    }`}
                >
                    {p.label}
                </button>
            ))}
        </div>
    )
}