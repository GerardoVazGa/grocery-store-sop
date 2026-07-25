export function CashCutSummary({ cashCutsSummary }) {

    return (
        <section>
            <h2>Corte de caja</h2>
            <p>Total del día: ${cashCutsSummary.totalAmount ?? 0}</p>
            <p>Efectivo en caja: ${cashCutsSummary.totalCash ?? 0}</p>
            <p>Tarjeta: ${cashCutsSummary.totalCard ?? 0}</p>
            <p>Total de ventas: {cashCutsSummary.totalSales ?? 0}</p>
            <p>Primera venta: {cashCutsSummary.firstSaleTime ?? "-"}</p>
            <p>Última venta: {cashCutsSummary.lastSaleTime ?? "-"}</p>
        </section>
    )
}