import { ipcMain } from "electron"
import { getAllCategories } from "./categories.repository.js"
import db from "../../db/connection.js"

export function registerCategoriesHandlers() {
    ipcMain.handle("categories:getAll", () => {
        return getAllCategories(db)
    })
}