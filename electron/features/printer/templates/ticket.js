export function generateTicketHTML({ sale, items, storeName = "Abarrotes" }) {
    const date = new Date().toLocaleString("es-MX")
    const total = items.reduce((sum, item) => sum + item.subtotal, 0)

    const itemsHTML = items.map((item) => `
        <tr>
            <td>${item.productName}</td>
            <td style="text-align:center">${item.quantity}</td>
            <td style="text-align:right">$${item.unitPrice.toFixed(2)}</td>
            <td style="text-align:right">$${item.subtotal.toFixed(2)}</td>
        </tr>
    `).join("")

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                * { margin: 0; padding: 0; box-sizing: border-box; }
                body {
                    font-family: 'Courier New', monospace;
                    font-size: 12px;
                    width: 80mm;
                    padding: 8px;
                }
                h1 { font-size: 16px; text-align: center; }
                h2 { font-size: 12px; text-align: center; font-weight: normal; }
                .divider { border-top: 1px dashed #000; margin: 6px 0; }
                table { width: 100%; border-collapse: collapse; }
                th { text-align: left; font-size: 10px; border-bottom: 1px solid #000; padding: 2px 0; }
                td { padding: 2px 0; vertical-align: top; }
                .total { font-size: 16px; font-weight: bold; text-align: right; margin-top: 6px; }
                .footer { text-align: center; margin-top: 8px; font-size: 10px; }
                .payment { text-align: right; font-size: 11px; margin-top: 4px; }
            </style>
        </head>
        <body>
            <h1>${storeName}</h1>
            <h2>Ticket de venta</h2>
            <div class="divider"></div>
            <p>Fecha: ${date}</p>
            <p>Venta #${sale.id}</p>
            <div class="divider"></div>

            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th style="text-align:center">Cant</th>
                        <th style="text-align:right">Precio</th>
                        <th style="text-align:right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsHTML}
                </tbody>
            </table>

            <div class="divider"></div>

            <p class="total">TOTAL: $${total.toFixed(2)}</p>
            <p class="payment">
                Método: ${sale.paymentMethod === "cash" ? "Efectivo" : sale.paymentMethod === "card" ? "Tarjeta" : "Transferencia"}
            </p>
            <div class="divider"></div>
            <p class="footer">¡Gracias por su compra!</p>
        </body>
        </html>
    `
}