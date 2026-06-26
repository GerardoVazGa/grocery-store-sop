import { ipcMain } from 'electron'
import db from '../../db/connection.js'
import {
    getAllProducts,
    createProduct,
    findProductByBarCode,
    findProductById,
    updateProduct
} from './products.repository.js'

export function registerProductsHandlers() {
    ipcMain.handle("products:getAll", () => {
        return getAllProducts(db)
    })

    ipcMain.handle("products:findByBarCode", (event, barCode) => {
        return findProductByBarCode(db, barCode)
    })

    ipcMain.handle("products:findById", (event, id) => {
        return findProductById(db, id)
    })

    ipcMain.handle("products:create", (event, product) => {
        return createProduct(db, product)
    })

    ipcMain.handle("products:update", (event, id, product) => {
        return updateProduct(db, id, product)
    })
}