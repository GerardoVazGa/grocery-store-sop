import { ipcMain } from "electron"
import db from "../../db/connection.js"
import { getAllBrands, getBrandsByCategory } from "./brands.repository.js"

export function registerBrandsHandlers() {
    ipcMain.handle("brands:getAll", () => {
        return getAllBrands(db)
    })

    ipcMain.handle("brands:getByCategory", (event, categoryId) => {
        return getBrandsByCategory(db, categoryId)
    })
}