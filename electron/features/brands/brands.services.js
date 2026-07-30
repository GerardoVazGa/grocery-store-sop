import { createBrand, findBrandWithCategoryId, updateBrand } from "./brands.repository.js"

export function createBrandService(db, data) {
    const { name, categoryId } = data

    const exist = findBrandWithCategoryId(db, name, categoryId)

    if (exist) throw new Error("Brand already exist")

    return createBrand(db, name, categoryId)
}

export function updateBrandService(db, id, data) {
    const { name, categoryId } = data

    return updateBrand(db, id, name, categoryId)
}