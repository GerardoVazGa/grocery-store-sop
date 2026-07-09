import { useDailySummary } from "../hooks/useDailySummary"

export function DailySummary() {
    const { dailySummary, isLoading, error } = useDailySummary()

    if(isLoading) return <p>Cargando...</p>
    if(error) return <p>Error al cargar</p>

    return (
        <section>
            <h2>Resumen del dia</h2>
            <p>Ventas realizadas: {dailySummary.totalSales ?? 0}</p>
            <p>Total vendido: ${dailySummary.totalRevenue ?? 0}</p>
            <p>Ticket promedio: ${dailySummary.averageSales ?? 0}</p>
            <p>Efectivo: ${dailySummary.totalCash ?? 0}</p>
            <p>Tarjeta: ${dailySummary.totalCard ?? 0}</p>
            <p>Transferencia: ${dailySummary.totalTransfer ?? 0}</p>
        </section>
    )
}