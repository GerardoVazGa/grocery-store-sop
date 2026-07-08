export function getDailySummary(db) {
    return db.prepare(
        `
            SELECT
                COUNT(sales.id) AS totalSales,
                ROUND(SUM(sales.total), 2) AS totalRevenue,
                ROUND(AVG(sales.total), 2) AS averageSales,
                ROUND(SUM(CASE WHEN sales.payment_method = 'cash' THEN sales.total ELSE 0 END), 2) AS totalCash,
                ROUND(SUM(CASE WHEN sales.payment_method = 'card' THEN sales.total ELSE 0 END), 2) AS totalCard,
                ROUND(SUM(CASE WHEN sales.payment_method = 'transfer' THEN sales.total ELSE 0 END), 2) AS totalTransfer
            FROM sales
        `
    ).get()
}

export function getTopProductsByCategory(db) {
    return db.prepare(`
        SELECT
            categories.name as categoryName,
            products.name as productName,
            SUM(sale_items.quantity) as totalQuantity,
            ROUND(SUM(sale_items.subtotal), 2) as totalRevenue
        FROM sale_items
        LEFT JOIN products ON products.id = sale_items.product_id
        LEFT JOIN categories ON categories.id = products.category_id
        LEFT JOIN sales ON sales.id = sale_items.sale_id
        GROUP BY products.id
        ORDER BY categories.name, totalQuantity DESC
    `).all()
}

export function getSalesByCategory(db) {
    return db.prepare(
        `
            SELECT
                categories.id AS categoryId,
                categories.name AS categoryName,
                COUNT(DISTINCT sales.id) AS totalSales,
                SUM(sale_items.quantity) AS totalQuantity,
                ROUND(SUM(sale_items.subtotal), 2) AS totalRevenue
            FROM sale_items
            LEFT JOIN products ON products.id = sale_items.product_id
            LEFT JOIN categories ON categories.id = products.category_id
            LEFT JOIN sales ON sales.id = sale_items.sale_id
            GROUP BY categories.id
            ORDER BY totalRevenue DESC

        `
    ).all()
}

export function getSalesByBrand(db) {
    return db.prepare(`
        SELECT
            brands.id as brandId,
            brands.name as brandName,
            categories.id as categoryId,
            categories.name as categoryName,
            COUNT(DISTINCT sales.id) as totalSales,
            SUM(sale_items.quantity) as totalQuantity,
            ROUND(SUM(sale_items.subtotal), 2) as totalRevenue
        FROM sale_items
        LEFT JOIN products ON products.id = sale_items.product_id
        LEFT JOIN brands ON brands.id = products.brand_id
        LEFT JOIN categories ON categories.id = products.category_id
        LEFT JOIN sales ON sales.id = sale_items.sale_id
        GROUP BY brands.id
        ORDER BY categories.name, totalRevenue DESC
    `).all()
}
