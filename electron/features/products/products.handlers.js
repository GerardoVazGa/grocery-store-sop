import { ipcMain } from 'electron'
import db from '../../db/connection.js'
import {
    getAllProducts,
    findProductByBarCode,
    findProductById,
} from './products.repository.js'
import { 
    createProductService, 
    searchProductsService, 
    updateProductService 
} from './products.services.js'

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
        return createProductService(db, product)
    })

    ipcMain.handle("products:update", (event, id, product) => {
        return updateProductService(db, id, product)
    })

    ipcMain.handle("products:search", (event, query) => {
        return searchProductsService(db, query)
    })
}