import { ipcMain } from "electron"
import db from "../../db/connection.js"
import { findBrandById, findBrandWithCategoryId, getAllBrands, getBrandsByCategory } from "./brands.repository.js"
import { createBrandService, updateBrandService } from "./brands.services.js"

export function registerBrandsHandlers() {
    ipcMain.handle("brands:getAll", () => {
        return getAllBrands(db)
    })

    ipcMain.handle("brands:getByCategory", (event, categoryId) => {
        return getBrandsByCategory(db, categoryId)
    })

    ipcMain.handle("brands:findById", (event, id) => {
        return findBrandById(db, id)
    })

    ipcMain.handle("brands:findWithCategoryId", (event, name, categoryId) => {
        return findBrandWithCategoryId(db, name, categoryId)
    })

    ipcMain.handle("brands:create", (event, data) => {
        return createBrandService(db, data)
    })

    ipcMain.handle("brands:update", (event, id, data) => {
        return updateBrandService(db, id, data)
    })
}