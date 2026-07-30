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

export function findCategoryByName(db, name) {
    return db.prepare(
        `
            SELECT 
                categories.id
            FROM categories
            WHERE categories.name = ?
        `
    ).get(name)
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

export function createCategory(db, name) {
    const result = db.prepare(
        `
            INSERT INTO categories (name)
            VALUES (?)
        `
    ).run(name)

    return {
        id: result.lastInsertRowid
    }
}

export function updateCategory(db, id, name) {
    const result = db.prepare(
        `
            UPDATE categories
            SET name = ?
            WHERE id = ?
        `
    ).run(name, id)

    if(result.changes === 0) {
        throw new Error("Category with id: " + id + " not found")
    }

    return {
        id,
        name
    }
}