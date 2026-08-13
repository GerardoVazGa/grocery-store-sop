import { useTopProducts } from "../hooks/useTopProducts"
import { useReportsPeriodStore } from "../store/reportsStore"

const periodLabel = {
    day: "hoy",
    week: "esta semana",
    month: "este mes",
}

export function TopProducts() {
    const { period } = useReportsPeriodStore()
    const { topProducts, isLoading, error } = useTopProducts(period)

    if (isLoading) return <div className="bg-surface rounded-xl p-6 animate-pulse h-48" />
    if (error) return <div className="bg-surface rounded-xl p-6 text-danger">Error al cargar</div>

    return (
        <div className="bg-surface rounded-xl p-6 shadow-sm">
            <h2 className="text-base font-semibold text-text mb-4">Top productos - {periodLabel[period]}</h2>
            {topProducts.length === 0 ? (
                <p className="text-text-muted text-sm">Sin ventas registradas</p>
            ) : (
                <div className="space-y-3">
                    {topProducts.map((product, index) => (
                        <div key={index} className="flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium text-text">{product.productName}</p>
                                <p className="text-xs text-text-muted">{product.categoryName}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-semibold text-text">${product.totalRevenue}</p>
                                <p className="text-xs text-text-muted">{product.totalQuantity} pzas</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}