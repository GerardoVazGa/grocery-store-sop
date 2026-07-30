import { createCategory, findCategoryByName, updateCategory } from "./categories.repository.js"

export function createCategoryService(db, data) {
    const { name } = data

    const exist = findCategoryByName(db, name)

    if (exist) throw new Error("Category already exist")

    return createCategory(db, name)
}

export function updateCategoryService(db, id, data) {
    const { name } = data

    return updateCategory(db, id, name)
}
