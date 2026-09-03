import { ipcMain } from "electron";
import { getDailySales, getDailySummary, getSalesByCategory, getSalesByCategoryAndBrand, getTopProductsByCategory,  } from "./reports.repository.js";
import db from "../../db/connection.js";

export function registerReportsHandlers() {
    ipcMain.handle("reports:getDailySummary", (event, period) => {
        return getDailySummary(db, period)
    })

    ipcMain.handle("reports:getTopProductsByCategory", (event, period) => {
        return getTopProductsByCategory(db, period)
    })

    ipcMain.handle("reports:getSalesByCategory", (event, period) => {
        return getSalesByCategory(db, period)
    })

    ipcMain.handle("reports:getSalesByCategoryAndBrand", (event, period) => {
        return getSalesByCategoryAndBrand(db, period)
    })

    ipcMain.handle("reports:getDailySales", (event, period) => {
        return getDailySales(db, period)
    })
}