import { ipcMain } from "electron"
import { findCategoryById, findCategoryByName, getAllCategories } from "./categories.repository.js"
import db from "../../db/connection.js"
import { createCategoryService, updateCategoryService } from "./categories.services.js"

export function registerCategoriesHandlers() {
    ipcMain.handle("categories:getAll", () => {
        return getAllCategories(db)
    })

    ipcMain.handle("categories:findById", (event, id) => {
        return findCategoryById(db, id)
    })

    ipcMain.handle("categories:findByName", (event, name) => {
        return findCategoryByName(db, name)
    })

    ipcMain.handle("categories:update", (event, id, data) => {
        return updateCategoryService(db, id, data)
    })

    ipcMain.handle("categories:create", (event, data) => {
        return createCategoryService(db, data)
    })
}