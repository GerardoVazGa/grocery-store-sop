import { nowLocal, todayLocal } from "../../shared/utils/dateUtils.js"

export function getCashCutSummary(db) {
    const today = todayLocal()
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
            WHERE date(sales.created_at) = '${today}'
        `
    ).get()
}

export function getDailySales(db) {
    const today = todayLocal()
    return db.prepare(`
        SELECT
            sales.id,
            sales.total,
            sales.payment_method as paymentMethod,
            sales.created_at as createdAt,
            COUNT(sale_items.id) as itemCount
        FROM sales
        LEFT JOIN sale_items ON sale_items.sale_id = sales.id
        WHERE date(sales.created_at) = '${today}'
        GROUP BY sales.id
        ORDER BY sales.created_at DESC
    `).all()
}

export function closeCashCut(db, cashCutId, countedCash) {
    const summary = db.prepare(`
        SELECT
            ROUND(SUM(CASE WHEN sales.payment_method = 'cash' THEN sales.total ELSE 0 END), 2) as cashSales
        FROM sales
        WHERE sales.cash_cut_id = ?
    `).get(cashCutId)

    const expectedCash = summary.cashSales ?? 0
    const difference = countedCash - expectedCash

    db.prepare(`
        UPDATE cash_cuts
        SET
            closed_at = ?,
            counted_cash = ?,
            expected_cash = ?,
            difference = ?,
            status = 'CLOSED'
        WHERE id = ?
    `).run(nowLocal(), countedCash, expectedCash, difference, cashCutId)

    return { cashCutId, countedCash, expectedCash, difference }
}

export function getActiveCashCut(db) {
    return db.prepare(`
        SELECT * FROM cash_cuts 
        WHERE closed_at IS NULL
        ORDER BY opened_at DESC
        LIMIT 1
    `).get()
}

export function getCashCutById(db, id) {
    return db.prepare(
        `
            SELECT * FROM cash_cuts
            WHERE id = ? 
        `
    ).get(id)
}

export function openCashCut(db, openingAmount) {
    const existingCashCut = getActiveCashCut(db)

    if (existingCashCut) {
        throw new Error("Ya hay un corte de caja abierto. Por favor, cierre el corte de caja actual antes de abrir uno nuevo.")
    }

    const result = db.prepare(
        `
            INSERT INTO cash_cuts (opened_at, opening_amount, status)
            VALUES(?, ?, 'OPEN')
        `
    ).run(nowLocal(), openingAmount)

    return getCashCutById(db, result.lastInsertRowid)
}

export function reopenCashCut(db, cashCutId) {
    const result = db.prepare(
        `
            UPDATE cash_cuts
            SET 
                closed_at = NULL, 
                counted_cash = NULL, 
                expected_cash = NULL, 
                difference = NULL,
                status = 'OPEN'
            WHERE id = ?
        `
    ).run(cashCutId)

    if(result.changes === 0) throw new Error(`No se pudo reabrir el corte de caja con ID ${cashCutId}.`)
    
    return getCashCutById(db, cashCutId)
}