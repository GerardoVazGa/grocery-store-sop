import { findBrandById } from "../brands/brands.repository.js"
import { findCategoryById } from "../categories/categories.repository.js"
import { createProduct, findProductByBarCode, searchProducts, updateProduct } from "./products.repository.js"

function validateProduct(db, product, productIdBeingUpdated = null) {
    const { barcode, name, categoryId, brandId, price, cost, stock } = product

    if(!name || name?.trim().length === 0) {
        throw new Error("El nombre del producto es requerido")
    }

    if(typeof price !== "number" || price <= 0) {
        throw new Error("El precio debe ser mayor a 0")
    }

    if(typeof cost !== "number" || cost < 0) {
        throw new Error("El costo no puede ser negativo")
    }

    if (typeof stock !== "number" || stock < 0 || !Number.isInteger(stock)) {
        throw new Error("El stock debe ser un número entero no negativo")
    }


    const barcodeClean = barcode?.trim() || null

    if(barcodeClean) {
        const exist = findProductByBarCode(db, barcodeClean)

        if(exist && exist.id !== productIdBeingUpdated) {
            throw new Error(`Ya existe un producto con el código de barras ${barcodeClean}`)
        }
    }

    if(categoryId) {
        const category = findCategoryById(db, categoryId)

        if(!category) {
            throw new Error("La categoría seleccionada no existe")
        }
    }

    if(brandId) {
        const brand = findBrandById(db, brandId)

        if(!brand) {
            throw new Error("La marca seleccionada no existe")
        }

        if(brand.categoryId !== categoryId) {
            throw new Error("La marca seleccionada no pertenece a la categoría seleccionada")
        }
    }

}

export function createProductService(db, product) {
    validateProduct(db, product)
    return createProduct(db, product)
}

export function updateProductService(db, id, product) {
    validateProduct(db, product, id)
    return updateProduct(db, id, product)
}

export function searchProductsService(db, query) {
    return searchProducts(db, query)
}