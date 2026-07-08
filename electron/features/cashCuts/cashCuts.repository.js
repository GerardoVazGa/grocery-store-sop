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