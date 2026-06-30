export function getAllCategories(db) {
    return db.prepare(
        `
            SELECT 
                categories.id,
                categories.name
            FROM categories
            ORDER BY categories.name
        `
    ).all()
}

export function findCategoryById(db, id) {
    return db.prepare(
        `
            SELECT 
                categories.id,
                categories.name
            FROM categories
            WHERE categories.id = ?
        `
    ).get(id)
}