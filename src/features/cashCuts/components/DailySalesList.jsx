export function DailySalesList({sales}) {
    if (sales.length === 0) return <p>No hay ventas registradas hoy</p>

    return (
        <section>
            <h2>Ventas del día</h2>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Fecha y hora</th>
                        <th>Productos</th>
                        <th>Método de pago</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <tr key={sale.id}>
                            <td>{sale.id}</td>
                            <td>{sale.createdAt}</td>
                            <td>{sale.itemCount}</td>
                            <td>{sale.paymentMethod === "cash" ? "Efectivo" : sale.paymentMethod === "card" ? "Tarjeta" : "Transferencia"}</td>
                            <td>${sale.total.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}