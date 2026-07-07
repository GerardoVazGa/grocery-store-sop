export function insertSale(db, totalAmount, paymentMethod) {
    const result = db.prepare(
        `
            INSERT INTO sales (total, payment_method)
            VALUES (?, ?)
        `
    ).run(totalAmount, paymentMethod)

    return result.lastInsertRowid
}

export function insertSaleItems(db, item) {
    const { saleId, productId, quantity, unitPrice, subtotal } = item

    db.prepare(
        `
            INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, subtotal)
            VALUES (?, ?, ?, ?, ?)
        `
    ).run(saleId, productId, quantity, unitPrice, subtotal)
}

export function decrementProductStock(db, productId, quantity) {
    db.prepare(
        `
            UPDATE products
            SET stock = stock - ?
            WHERE id = ?
        `
    ).run(quantity, productId)
}

export function getAllSales(db) {
    return db.prepare(
        `
            SELECT
                sales.id,
                sales.total,
                sales.payment_method AS paymentMethod,
                sales.created_at AS createdAt,
                sales.cash_cut_id AS cashCutId
            FROM sales
            ORDER BY sales.created_at DESC
        `
    ).all()
}

export function getSaleById(db, saleId) {
    return db.prepare(
        `
            SELECT
                sales.id,
                sales.total,
                sales.payment_method AS paymentMethod,
                sales.created_at AS createdAt,
                sale_items.product_id AS productId,
                products.name AS productName,
                sale_items.quantity AS quantity,
                sale_items.unit_price AS unitPrice,
                sale_items.subtotal AS subtotal
            FROM sales
            LEFT JOIN sale_items ON sale_items.sale_id = sales.id
            LEFT JOIN products ON products.id = sale_items.product_id
            WHERE sales.id = ?
        `
    ).all(saleId)
}