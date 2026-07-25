export function getCashCutSummary(db) {
    return db.prepare(
        `
            SELECT
                COUNT(sales.id) AS totalSales,
                ROUND(SUM(sales.total), 2) AS totalAmount,
                ROUND(SUM(CASE WHEN sales.payment_method = 'cash' THEN sales.total ELSE 0 END), 2) AS totalCash,
                ROUND(SUM(CASE WHEN sales.payment_method = 'card' THEN sales.total ELSE 0 END), 2) AS totalCard,
                ROUND(SUM(CASE WHEN sales.payment_method = 'transfer' THEN sales.total ELSE 0 END), 2) AS totalTransfer,
                MIN(sales.created_at) AS firstSaleTime,
                MAX(sales.created_at) AS lastSaleTime
            FROM sales
        `
    ).get()
}

export function getDailySales(db) {
    return db.prepare(`
        SELECT
            sales.id,
            sales.total,
            sales.payment_method as paymentMethod,
            sales.created_at as createdAt,
            COUNT(sale_items.id) as itemCount
        FROM sales
        LEFT JOIN sale_items ON sale_items.sale_id = sales.id
        GROUP BY sales.id
        ORDER BY sales.created_at DESC
    `).all()
}

export function closeCashCut(db) {
    const summary = db.prepare(`
        SELECT
            ROUND(SUM(sales.total), 2) as expectedCash,
            ROUND(SUM(CASE WHEN sales.payment_method = 'cash' THEN sales.total ELSE 0 END), 2) as cashSales
        FROM sales
    `).get()

    const result = db.prepare(`
        INSERT INTO cash_cuts (opened_at, closed_at, opening_amount, expected_cash, counted_cash, difference)
        VALUES (datetime('now'), datetime('now'), 0, ?, ?, 0)
    `).run(summary.expectedCash, summary.cashSales)

    return { id: result.lastInsertRowid, ...summary }
}