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
    ).all()
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

export function findBrandWithCategoryId(db, name, categoryId) {
    return db.prepare(
        `
            SELECT 
                brands.id,
                brands.name,
                brands.category_id AS categoryId
            FROM brands
            WHERE brands.name = ? AND brands.category_id = ?
        `
    ).get(name, categoryId)
}

export function createBrand(db, name, categoryId) {
    const result = db.prepare(
        `
            INSERT INTO brands (name, category_id)
            VALUES (?, ?)
        `
    ).run(name, categoryId)

    return {
        id: result.lastInsertRowid,
        name,
        categoryId
    }
}

export function updateBrand(db, id, name, categoryId) {
    const result = db.prepare(
        `
            UPDATE brands
            SET name = ?
            WHERE id = ?
        `
    ).run(name, id)

    if(result.changes === 0) {
        throw new Error("Brand with id: " + id + " not found")
    }

    return {
        id,
        name,
        categoryId
    }
}