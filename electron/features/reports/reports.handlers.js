import { ipcMain } from "electron";
import { getDailySummary, getSalesByBrand, getSalesByCategory, getTopProductsByCategory } from "./reports.repository.js";
import db from "../../db/connection.js";

export function registerReportsHandlers() {
    ipcMain.handle("reports:getDailySummary", () => {
        return getDailySummary(db)
    })

    ipcMain.handle("reports:getTopProductsByCategory", () => {
        return getTopProductsByCategory(db)
    })

    ipcMain.handle("reports:getSalesByCategory", () => {
        return getSalesByCategory(db)
    })

    ipcMain.handle("reports:getSalesByBrand", () => {
        return getSalesByBrand(db)
    })
}