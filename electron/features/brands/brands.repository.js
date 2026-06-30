export function getAllBrands(db) {
    return db.prepare(
        `
            SELECT 
                brands.id,
                brands.name,
                brands.category_id AS categoryId
            FROM brands
            ORDER BY brands.name
        `
    )
}

export function getBrandsByCategory(db, categoryId) {
    return db.prepare(
        `
            SELECT 
                brands.id,
                brands.name,
                brands.category_id AS categoryId
            FROM brands
            WHERE brands.category_id = ?
            ORDER BY brands.name
        `
    ).all(categoryId)
}

export function findBrandById(db, id) {
    return db.prepare(
        `
            SELECT 
                brands.id,
                brands.name,
                brands.category_id AS categoryId
            FROM brands
            WHERE brands.id = ?
        `
    ).get(id)
}