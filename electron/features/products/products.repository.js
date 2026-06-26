export function getAllProducts(db) {
    return db.prepare(
        `
            SELECT 
                products.id,
                products.barcode,
                products.name,
                products.category_id as categoryId,
                categories.name as categoryName,
                products.brand_id as brandId,
                brands.name as brandName,
                products.price,
                products.cost,
                products.stock,
                products.created_at as createdAt
            FROM products
            LEFT JOIN categories ON categories.id = products.category_id
            LEFT JOIN brands ON brands.id = products.brand_id
            ORDER BY products.name
        `
    ).all()
}

export function findProductByBarCode(db, barCode) {
    return db.prepare(
        `
            SELECT 
                products.id,
                products.barcode,
                products.name,
                products.category_id as categoryId,
                categories.name as categoryName,
                products.brand_id as brandId,
                brands.name as brandName,
                products.price,
                products.cost,
                products.stock,
                products.created_at as createdAt
            FROM products
            LEFT JOIN categories ON categories.id = products.category_id
            LEFT JOIN brands ON brands.id = products.brand_id
            WHERE products.barcode = ?
        `
    ).get(barCode)
}

export function createProduct(db, product) {
    const { barcode, name, categoryId, brandId, price, cost, stock } = product

    const result = db.prepare(
        `
            INSERT INTO products (barcode, name, category_id, brand_id, price, cost, stock)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `
    ).run(barcode, name, categoryId, brandId ?? null, price, cost ?? 0, stock ?? 0)

    return findProductById(db, result.lastInsertRowid)
}

export function findProductById(db, id) {
    return db.prepare(
        `
            SELECT 
                products.id,
                products.barcode,
                products.name,
                products.category_id as categoryId,
                categories.name as categoryName,
                products.brand_id as brandId,
                brands.name as brandName,
                products.price,
                products.cost,
                products.stock,
                products.created_at as createdAt
            FROM products
            LEFT JOIN categories ON categories.id = products.category_id
            LEFT JOIN brands ON brands.id = products.brand_id
            WHERE products.id = ?
        `
    ).get(id)
}

export function updateProduct(db, id, product) {
    const { barcode, name, categoryId, brandId, price, cost, stock } = product

    const result = db.prepare(
        `
            UPDATE products
            SET 
                barcode = ?,
                name = ?, 
                category_id = ?, 
                brand_id = ?, 
                price = ?, 
                cost = ?, 
                stock = ?
            WHERE id = ?
        `
    ).run(barcode, name, categoryId, brandId ?? null, price, cost ?? 0, stock ?? 0, id)

    if(result.changes === 0) {
        throw new Error("Product with id: " + id + " not found")
    } 

    return findProductById(db, id)
}